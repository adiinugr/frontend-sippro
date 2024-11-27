'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef, Row, RowData, Column, Table } from '@tanstack/react-table'
import classNames from 'classnames'

// Type Imports
import type { InputReportSecondSemesterType } from '@/types/inputReportTypes'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import { secondSemesterInputData } from '@/data/dummy/reportInputData'

// Column Definitions
const columnHelper = createColumnHelper<InputReportSecondSemesterType>()

const columns = [
  columnHelper.accessor('orderNumber', {
    header: 'No'
  }),
  columnHelper.accessor('subjectName', {
    header: 'Mata Pelajaran'
  }),

  columnHelper.accessor('smt3', {
    header: 'SMT 3'
  }),
  columnHelper.accessor('smt4', {
    header: 'SMT 4'
  }),
  columnHelper.accessor('smt5', {
    header: 'SMT 5'
  }),
  columnHelper.accessor('smt6', {
    header: 'SMT 6'
  })
]

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

// Custom cell component that handles input with state and side-effects
interface EditableCellProps<TData extends RowData> {
  getValue: () => unknown
  row: Row<TData>
  column: Column<TData>
  table: Table<TData>
}

const EditableCell = <TData extends RowData>({ getValue, row, column, table }: EditableCellProps<TData>) => {
  // Vars
  const initialValue = getValue()

  // States
  const [value, setValue] = useState(initialValue)

  const disabledColumn = ['orderNumber', 'subjectName']

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      disabled={disabledColumn.includes(column.id)}
      type={column.id === 'subjectName' ? 'text' : 'number'}
      value={value as string}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className={classNames(
        {
          border: !disabledColumn.includes(column.id)
        },
        {
          'w-full': column.id === 'subjectName'
        },
        {
          'w-[70px]': column.id !== 'subjectName'
        }
      )}
    />
  )
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<InputReportSecondSemesterType>> = {
  cell: ({ getValue, row, column, table }) => {
    return <EditableCell getValue={getValue} row={row} column={column} table={table} />
  }
}

const ReportInputSecondSemester = () => {
  // States
  const [data, setData] = useState(() => secondSemesterInputData)

  // Hooks
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    },

    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old: any[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              }
            }

            return row
          })
        )
      }
    }
  })

  return (
    <div className='overflow-x-auto'>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={styles.cellWithInput}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default ReportInputSecondSemester
