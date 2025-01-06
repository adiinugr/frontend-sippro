'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
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

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import AddSubjectGroupStudentTable from '@/views/subject-group/manage/AddSubjectGroupStudentTable'
import DeleteDialog from '@/components/other/DeleteDialog'

// Type Imports
import type { ManageClassroomType } from '@/types/classroomTypes'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Actions
import { fetchClassrooms } from '@/libs/actions/classrooms'
import { deleteStudentsSubjectGroupsToClassrooms } from '@/libs/actions/studentsTosubjectGroupsToClassrooms'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type MappedClassroom = {
  id: number
  name: string
  nis: string
  nisn: string
}

type ManageClassroomTypeWithAction = MappedClassroom & {
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
const columnHelper = createColumnHelper<ManageClassroomTypeWithAction>()

const ManageClassroomListTable = ({
  classroomsToSubjectGroupId,
  tableData,
  subjectGroup,
  classroom
}: { tableData?: ManageClassroomType[] } & {
  subjectGroup: { id: number; name: string }
  classroom: string
  classroomsToSubjectGroupId: number
}) => {
  const router = useRouter()

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const [classroomData, setClassroomData] = useState([])

  // Crud State
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false)

  const [selectedClassroom, setClasroomData] = useState<
    {
      id: number
      name: string
      nis: string
      nisn: string
    }[]
  >([])

  // Delete Actions
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const mappedData: any = tableData?.map(data => {
      return {
        id: data.student.id,
        name: data.student.name,
        nis: data.student.nis,
        nisn: data.student.nisn
      }
    })

    setClassroomData(mappedData)
  }, [tableData])

  const handleOpenDialog = (id: number) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  const classroomArray: { id: number }[] = selectedClassroom.filter(
    (value: { name: string }) => value.name === classroom
  )

  const classroomId = classroomArray[0]?.id

  const classroomObject = {
    name: classroom,
    id: classroomId
  }

  useEffect(() => {
    async function fetchData() {
      const classroomRes = await fetchClassrooms()

      setClasroomData(classroomRes.result)
    }

    fetchData()
  }, [])

  const handleDeleteData = async () => {
    const payloadData = {
      studentId: selectedId,
      classroomsToSubjectGroupId
    }

    setIsLoading(true)

    try {
      const res = await deleteStudentsSubjectGroupsToClassrooms(payloadData)

      setIsLoading(false)
      setOpenDialog(false)

      if (res.statusCode === 200) {
        toast.success(`Berhasil menghapus data!`)
        router.refresh()

        return
      }

      toast.error(`Gagal menghapus data!`)
    } catch (error) {
      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal menghapus data!`)
    }
  }

  const columns = useMemo<ColumnDef<ManageClassroomTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Nama Siswa',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('nis', {
        header: 'NIS',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.nis}
          </Typography>
        )
      }),
      columnHelper.accessor('nisn', {
        header: 'NISN',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.nisn}
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
          </div>
        ),
        enableSorting: false
      })
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classroomData]
  )

  const table = useReactTable({
    data: classroomData as MappedClassroom[],
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
            placeholder='Cari Siswa'
            className='max-sm:is-full'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddStudentDialogOpen(!addStudentDialogOpen)}
            className='max-sm:is-full'
          >
            Tambah Siswa
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

      <AddSubjectGroupStudentTable
        open={addStudentDialogOpen}
        setOpen={setAddStudentDialogOpen}
        classroom={classroomObject}
        subjectGroup={subjectGroup}
      />

      <DeleteDialog
        open={openDialog}
        isLoading={isLoading}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleDeleteData}
      />
    </>
  )
}

export default ManageClassroomListTable
