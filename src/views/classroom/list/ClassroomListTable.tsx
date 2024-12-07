'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'

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
import AddClassroomDrawer from './AddClassroomDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { ClassroomType } from '@/types/classroomTypes'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import DeleteDialog from '@/components/other/DeleteDialog'
import UpdateClassroomDrawer from './UpdateClassroomDrawer'
import { createClassroom, deleteClassroomById, getClassroomById, updateClassroom } from '@/libs/actions/classrooms'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ClassroomTypeWithAction = {
  id: number
  name: string
  grade: {
    name: string
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
const columnHelper = createColumnHelper<ClassroomTypeWithAction>()

const ClassroomListTable = ({ tableData }: { tableData?: ClassroomType[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Crud State
  const [addClassroomOpen, setAddClassroomOpen] = useState(false)
  const [updateClassroomOpen, setUpdateClassroomOpen] = useState(false)

  const [selectedDataById, setSelectedDataById] = useState<{
    id: number | null
    name: string
    grade: {
      id: number | string
    }
  }>({
    id: null,
    name: '',
    grade: {
      id: ''
    }
  })

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
      const res = await deleteClassroomById(selectedId)

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

  const handleUpdate = async (val: ClassroomType, id: number) => {
    setIsLoading(true)

    try {
      const res = await updateClassroom(val, id)

      setIsLoading(false)
      setOpenDialog(false)

      if (res.statusCode === 200) {
        toast.success(`Berhasil mengupdate data!`)

        return
      }

      toast.error(`Gagal mengupdate data! ${res.result.response.message[0]}`)
    } catch (error) {
      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal mengupdate data!`)
    }
  }

  const handleOpenUpdateDrawer = async (id: number) => {
    const selectedData = await getClassroomById(id)

    setSelectedDataById(selectedData.result)

    setUpdateClassroomOpen(true)
  }

  const handleCreate = async (val: ClassroomType) => {
    setIsLoading(true)

    try {
      const res = await createClassroom(val)

      setIsLoading(false)
      setOpenDialog(false)

      if (res.statusCode === 201) {
        toast.success(`Berhasil menambah data!`)

        return
      }

      toast.error(`Gagal menambah data! ${res.result.response.message[0]}`)
    } catch (error) {
      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal menambah data!`)
    }
  }

  // End Crud

  const columns = useMemo<ColumnDef<ClassroomTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Kelas',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('grade', {
        header: 'Jenjang',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.grade.name}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleOpenDialog(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleOpenUpdateDrawer(row.original.id)}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData]
  )

  const table = useReactTable({
    data: tableData as ClassroomType[],
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
        <CardHeader title='Data Kelas' className='pbe-4' />
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
              placeholder='Cari Kelas'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddClassroomOpen(!addClassroomOpen)}
              className='max-sm:is-full'
            >
              Tambah Kelas
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
      <AddClassroomDrawer
        open={addClassroomOpen}
        isLoading={isLoading}
        handleClose={() => setAddClassroomOpen(!addClassroomOpen)}
        handleCreate={handleCreate}
      />
      <UpdateClassroomDrawer
        open={updateClassroomOpen}
        selectedData={selectedDataById}
        isLoading={isLoading}
        handleClose={() => setUpdateClassroomOpen(!updateClassroomOpen)}
        handleUpdate={(val, id) => handleUpdate(val, id)}
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

export default ClassroomListTable
