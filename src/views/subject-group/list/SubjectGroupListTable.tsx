'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Tooltip } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
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
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { toast } from 'react-toastify'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import TableFilters from './TableFilters'
import CustomTextField from '@core/components/mui/TextField'
import DeleteDialog from '@/components/other/DeleteDialog'

// Type Imports
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Actions
import { deleteSubjectGroupById } from '@/libs/actions/subjectGroups'
import { sortedClassroomArray } from '@/utils/sortedClassroomArray'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type SubjectGroupTypeWithAction = SubjectGroupType & {
  stats?: string
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
const columnHelper = createColumnHelper<SubjectGroupTypeWithAction>()

const SubjectGroupListTable = ({
  tableData,
  lessonYearData,
  gradeData
}: {
  tableData?: SubjectGroupType[]
  lessonYearData: { id: number; name: string }[]
  gradeData: { id: number; name: string }[]
}) => {
  const { push } = useRouter()

  // States
  const [rowSelection, setRowSelection] = useState({})

  // const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  // Delete Actions
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOpenDialog = (id: number) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  // Crud Operations
  const handleDeleteData = async () => {
    setIsLoading(true)

    try {
      const res = await deleteSubjectGroupById(selectedId)

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

  const columns = useMemo<ColumnDef<SubjectGroupTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('lessonYear', {
        header: 'Tahun Pelajaran',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.lessonYear.name}
          </Typography>
        )
      }),
      columnHelper.accessor('grade', {
        header: 'Kelas',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.grade.name}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Kelompok Mapel',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('stats', {
        header: 'Statistik',
        cell: ({ row }) => (
          <div className='flex items-center gap-2 flex-wrap divide-x'>
            {sortedClassroomArray(row.original.clsrmsToSbjgs).map(val => (
              <div key={val.classroom.id} className='p-2'>
                <p className='font-bold text-sm text-teal-600'>{val.classroom.name}</p>
                <p className='text-sm'>{`${val.stdsToSbjgsToClsrms.length} Siswa`}</p>
              </div>
            ))}
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Tooltip title='Hapus'>
              <IconButton onClick={() => handleOpenDialog(row.original.id)}>
                <i className='tabler-trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton onClick={() => push(`/teacher/setting/subject-group/edit/${row.original.id}`)}>
                <i className='tabler-edit' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Kelola Siswa'>
              <IconButton onClick={() => push(`/teacher/setting/subject-group/manage/${row.original.id}`)}>
                <i className='tabler-user-square-rounded' />
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
    data: filteredData as SubjectGroupType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      sorting: [
        {
          id: 'lessonYear',
          desc: false
        },
        {
          id: 'grade',
          desc: false
        }
      ],
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
        <CardHeader title='Data Kelompok Mapel' className='pbe-4' />
        <TableFilters
          setData={setFilteredData}
          tableData={tableData}
          lessonYearData={lessonYearData}
          gradeData={gradeData}
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
              placeholder='Cari'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              component={Link}
              startIcon={<i className='tabler-plus' />}
              href='/teacher/setting/subject-group/add'
              className='max-sm:is-full'
            >
              Tambah Kelompok Baru
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

export default SubjectGroupListTable
