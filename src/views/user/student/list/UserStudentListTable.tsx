'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Import
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
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

// Types
import type { StudentType } from '@/types/usersTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import TableFilters from './TableFilters'
import TablePaginationComponent from '@components/TablePaginationComponent'
import DeleteDialog from '@/components/other/DeleteDialog'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Actions
import { deleteStudentById } from '@/libs/actions/students'
import DialogImportStudents from '@/views/user/student/list/dialog'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersStudentTypeWithAction = StudentType & {
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

const sortedClassroomArray = (array: any[]) => {
  return array.sort((a, b) => a.clsrmsToSbjg.classroom.name.localeCompare(b.clsrmsToSbjg.classroom.name))
}

// Column Definitions
const columnHelper = createColumnHelper<UsersStudentTypeWithAction>()

const UserStudentListTable = ({ tableData }: { tableData?: StudentType[] }) => {
  // Router
  const { push } = useRouter()

  // States
  const [rowSelection, setRowSelection] = useState({})
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
      const res = await deleteStudentById(selectedId)

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

  const columns = useMemo<ColumnDef<UsersStudentTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'Siswa',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, name: row.original.name })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
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
      columnHelper.accessor('stTSbgTc', {
        header: 'Kelas',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {row.original.stTSbgTc.length === 0 ? (
              <Chip variant='tonal' color='warning' label='Belum Diatur' className='bg-orange-100 text-orange-700' />
            ) : (
              sortedClassroomArray(row.original.stTSbgTc).map(val => (
                <Chip variant='tonal' key={val.clsrmsToSbjg.classroom.id} label={val.clsrmsToSbjg.classroom.name} />
              ))
            )}
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Tooltip title='Hapus'>
              <IconButton onClick={() => handleOpenDialog(row.original.id)}>
                <i className='tabler-trash text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Preview'>
              <IconButton onClick={() => push(`/teacher/user/student/profile/${row.original.id}`)}>
                <i className='tabler-eye text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton onClick={() => push(`/teacher/user/student/edit/${row.original.id}`)}>
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Nilai Raport'>
              <IconButton onClick={() => push(`/teacher/user/student/report/${row.original.id}`)}>
                <i className='tabler-report-analytics text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Prestasi'>
              <IconButton onClick={() => push(`/teacher/user/student/achievement/${row.original.id}`)}>
                <i className='tabler-trophy text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Tanya AI'>
              <IconButton onClick={() => push(`/teacher/user/student/chat-ai/${row.original.id}`)}>
                <i className='tabler-message-chatbot text-textSecondary' />
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
    data: filteredData as StudentType[],
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

  const getAvatar = (params: Pick<StudentType, 'avatar' | 'name'>) => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(name as string)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Data Siswa' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={tableData} />
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
            <DialogImportStudents />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              href='/teacher/user/student/add'
              component={Link}
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
          component={() => <TablePaginationComponent table={table as any} />}
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

export default UserStudentListTable
