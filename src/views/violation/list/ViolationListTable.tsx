'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, Tooltip } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { toast } from 'react-toastify'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import { rankItem, type RankingInfo } from '@tanstack/match-sorter-utils'
import * as XLSX from 'xlsx'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

// Type Imports
import type { TextFieldProps } from '@mui/material/TextField'

import type { ViolationType } from '@/types/violationTypes'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import DeleteDialog from '@/components/other/DeleteDialog'
import TableFilters from '@/views/violation/list/TableFilters'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Actions
import { deleteViolationById } from '@/libs/actions/violations'

// Utils
import { orderLessonYear } from '@/utils/lessonYear'
import { fetchClassrooms } from '@/libs/actions/classrooms'
import ViolationDialog from '@/components/dialogs/violation-dalog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type StudentsViolationRulesTypeWithAction = {
  id: number
  date: string
  classroom: string
  student: {
    id: number
    name: string
    nis: string
    nisn: string
    stTSbgTc: {
      clsrmsToSbjg: {
        classroom: {
          id: number
          name: string
        }
      }
    }[]
  }
  rule: {
    id: number
    name: string
    point: number
  }
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<StudentsViolationRulesTypeWithAction>()

// Vars
const buttonProps: ButtonProps = {
  variant: 'tonal',
  children: 'Export',
  startIcon: <i className='tabler-upload' />
}

const ViolationListTable = ({ tableData }: { tableData?: ViolationType[] }) => {
  // Router
  const { push } = useRouter()

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const [filteredData, setFilteredData] = useState(tableData)

  // Delete Actions
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Add state for selected classroom
  const [selectedClassroom, setSelectedClassroom] = useState<string>('all')
  const [classroomData, setClassroomData] = useState<any[]>([])

  // Fetch classroom data
  useEffect(() => {
    const fetchData = async () => {
      const classroomRes = await fetchClassrooms()

      setClassroomData(classroomRes.result || [])
    }

    fetchData()
  }, [])

  const handleOpenDialog = (id: number) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  // Crud Operations
  const handleDeleteData = async () => {
    setIsLoading(true)

    try {
      const res = await deleteViolationById(selectedId)

      setIsLoading(false)
      setOpenDialog(false)

      if (res.statusCode === 200) {
        toast.success(`Berhasil menghapus data!`)

        return
      }

      toast.error(`Gagal menghapus data!`)
    } catch (error) {
      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal menghapus data!`)
    }
  }

  // End Crud

  const handleExport = (selectedClassrooms: string[], splitFile: boolean) => {
    // Handle empty selection
    if (!selectedClassrooms.length) {
      toast.error('Pilih minimal satu kelas untuk diekspor')

      return
    }

    // Check which classrooms have no data first
    const classroomsWithNoData = selectedClassrooms.filter(
      classroom =>
        !filteredData?.some(
          item => orderLessonYear(item.student.stTSbgTc).slice(-1)[0].clsrmsToSbjg.classroom.name === classroom
        )
    )

    if (classroomsWithNoData.length === selectedClassrooms.length) {
      toast.error(`Tidak ada data untuk semua kelas yang dipilih`)

      return
    }

    const validClassrooms = selectedClassrooms.filter(c => !classroomsWithNoData.includes(c))

    if (splitFile) {
      // Export separate files for each valid classroom
      validClassrooms.forEach(classroom => {
        const dataToExport = filteredData?.filter(
          item => orderLessonYear(item.student.stTSbgTc).slice(-1)[0].clsrmsToSbjg.classroom.name === classroom
        )

        if (dataToExport?.length) {
          exportToExcel(dataToExport, classroom)
        }
      })
    } else {
      // Export single file with all valid classroom data
      const dataToExport = filteredData?.filter(item =>
        validClassrooms.includes(orderLessonYear(item.student.stTSbgTc).slice(-1)[0].clsrmsToSbjg.classroom.name)
      )

      exportToExcel(dataToExport, validClassrooms.length > 1 ? validClassrooms.join(', ') : validClassrooms[0])
    }

    // Show warning for classrooms with no data
    if (classroomsWithNoData.length) {
      toast.warning(`Beberapa kelas tidak memiliki data: ${classroomsWithNoData.join(', ')}`)
    }
  }

  // Helper function to export data
  const exportToExcel = (data: any[] | undefined, classroomTitle: string) => {
    if (!data?.length) {
      toast.error(`Tidak ada data untuk diekspor untuk kelas: ${classroomTitle}`)

      return
    }

    const exportedData = data.map(item => ({
      Nama: item.student.name,
      NIS: item.student.nis,
      NISN: item.student.nisn,
      Kelas: orderLessonYear(item.student.stTSbgTc).slice(-1)[0].clsrmsToSbjg.classroom.name,
      Tanggal: format(new Date(item.date), 'EEEE, dd MMM yyyy', { locale: id }),
      'Nama Pelanggaran': item.rule.name,
      Poin: item.rule.point
    }))

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [['DATA PELANGGARAN SISWA SMAN 10 SURABAYA'], ['TAHUN PELAJARAN 2024-2025'], [`KELAS: ${classroomTitle}`], []],
      { origin: 0 }
    )

    XLSX.utils.sheet_add_json(worksheet, exportedData, { origin: 'A5', skipHeader: true })
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pelanggaran')
    XLSX.writeFile(workbook, `Data Pelanggaran - ${classroomTitle}.xlsx`)
  }

  const columns = useMemo<ColumnDef<StudentsViolationRulesTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('student.name', {
        header: 'Nama Siswa',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.student.name}
          </Typography>
        )
      }),

      columnHelper.accessor('classroom', {
        header: 'Kelas',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {orderLessonYear(row.original.student.stTSbgTc).slice(-1)[0].clsrmsToSbjg.classroom.name}
          </Typography>
        )
      }),

      columnHelper.accessor('student.nis', {
        header: 'NIS',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.student.nis}
          </Typography>
        )
      }),

      columnHelper.accessor('date', {
        header: 'Tanggal',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {format(new Date(row.original.date), 'EEEE, dd MMM yyyy', { locale: id })}
          </Typography>
        )
      }),

      columnHelper.accessor('rule.name', {
        header: 'Nama Pelanggaran',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original?.rule?.name || 'Tidak Ada Data'}
          </Typography>
        )
      }),

      columnHelper.accessor('rule.point', {
        header: 'Poin Pelanggaran',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original?.rule?.point || 'Tidak Ada Data'}
          </Typography>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Tooltip title='Delete'>
              <IconButton onClick={() => handleOpenDialog(row.original.id)}>
                <i className='tabler-trash text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton onClick={() => push(`/teacher/violation/edit/${row.original.id}`)}>
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false
      })
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData, filteredData]
  )

  const table = useReactTable({
    data: filteredData as ViolationType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Data Pelanggaran' className='pbe-4' />
        <TableFilters
          setData={setFilteredData}
          tableData={tableData}
          selectedClassroom={selectedClassroom}
          setSelectedClassroom={setSelectedClassroom}
          classroomData={classroomData}
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Cari Pelanggaran'
              className='max-sm:is-full'
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps}
              dialog={ViolationDialog}
              dialogProps={{
                handleExport: handleExport,
                filteredData: filteredData
              }}
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => push(`/teacher/violation/add`)}
              className='max-sm:is-full'
            >
              Tambah Pelanggaran
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <DeleteDialog
        open={openDialog}
        isLoading={isLoading}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleDeleteData}
      />
    </>
  )
}

export default ViolationListTable
