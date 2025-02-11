'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
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

// Type Imports
import type { TextFieldProps } from '@mui/material/TextField'

import type { RuleCategoryType } from '@/types/ruleTypes'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import AddRuleCategoryDrawer from './AddRuleCategoryDrawer'
import CustomTextField from '@core/components/mui/TextField'
import DeleteDialog from '@/components/other/DeleteDialog'
import UpdateRuleCategoryDrawer from './UpdateRuleCategoryDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Actions
import {
  createRuleCategory,
  deleteRuleCategoryById,
  getRuleCategoryById,
  updateRuleCategory
} from '@/libs/actions/ruleCategories'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type RuleCategoryTypeWithAction = {
  id: number
  name: string
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
const columnHelper = createColumnHelper<RuleCategoryTypeWithAction>()

const RuleCategoryListTable = ({ tableData }: { tableData?: RuleCategoryType[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Crud State
  const [addRuleCategoryOpen, setAddRuleCategoryOpen] = useState(false)
  const [updateRuleCategoryOpen, setUpdateRuleCategoryOpen] = useState(false)

  const [selectedDataById, setSelectedDataById] = useState<{ id: number | null; name: string }>({
    id: null,
    name: ''
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
      const res = await deleteRuleCategoryById(selectedId)

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

  const handleUpdate = async (val: { name: string }, id: number) => {
    setIsLoading(true)

    try {
      const res = await updateRuleCategory({ name: val.name }, id)

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
    const selectedData = await getRuleCategoryById(id)

    setSelectedDataById(selectedData.result)

    setUpdateRuleCategoryOpen(true)
  }

  const handleCreate = async (val: { name: string }) => {
    setIsLoading(true)

    try {
      const res = await createRuleCategory(val)

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

  const columns = useMemo<ColumnDef<RuleCategoryTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Nama',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.name}
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
              <IconButton onClick={() => handleOpenUpdateDrawer(row.original.id)}>
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false
      })
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData]
  )

  const table = useReactTable({
    data: tableData as RuleCategoryType[],
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
        <CardHeader title='Data Kategori Pelanggaran' className='pbe-4' />
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
              placeholder='Cari Kategori Pelanggaran'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddRuleCategoryOpen(!addRuleCategoryOpen)}
              className='max-sm:is-full'
            >
              Tambah Kategori Pelanggaran
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
      <AddRuleCategoryDrawer
        open={addRuleCategoryOpen}
        isLoading={isLoading}
        handleClose={() => setAddRuleCategoryOpen(!addRuleCategoryOpen)}
        handleCreate={handleCreate}
      />
      <UpdateRuleCategoryDrawer
        open={updateRuleCategoryOpen}
        selectedData={selectedDataById}
        isLoading={isLoading}
        handleClose={() => setUpdateRuleCategoryOpen(!updateRuleCategoryOpen)}
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

export default RuleCategoryListTable
