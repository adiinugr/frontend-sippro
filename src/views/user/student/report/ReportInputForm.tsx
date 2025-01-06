'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Button, CardActions, CardContent, Divider, Typography } from '@mui/material'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef, Row, RowData, Column, Table } from '@tanstack/react-table'
import classNames from 'classnames'
import { toast } from 'react-toastify'

// Type Imports
import type { InputReportType } from '@/types/inputReportTypes'

// Style Imports
import styles from '@core/styles/table.module.css'

// Actions
import { createMark, deleteMarkById } from '@/libs/actions/marks'

// Column Definitions
const columnHelper = createColumnHelper<InputReportType>()

const columns = [
  columnHelper.accessor('subjectOrder', {
    header: 'No'
  }),
  columnHelper.accessor('subject', {
    header: 'Mata Pelajaran',
    cell: ({ row }) => (
      <Typography className='capitalize' color='text.primary'>
        {row.original.subject.name}
      </Typography>
    )
  }),
  columnHelper.accessor('smt1', {
    header: 'SMT 1'
  }),
  columnHelper.accessor('smt2', {
    header: 'SMT 2'
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

interface Props {
  subjectData: InputReportType[]
  marks: any
  studentId: number
}

const EditableCell = <TData extends RowData>({ getValue, row, column, table }: EditableCellProps<TData>) => {
  // Vars
  const initialValue = getValue()

  // States
  const [value, setValue] = useState(initialValue)

  const disabledColumn = ['subjectOrder', 'subject']

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
const defaultColumn: Partial<ColumnDef<InputReportType>> = {
  cell: ({ getValue, row, column, table }) => {
    return <EditableCell getValue={getValue} row={row} column={column} table={table} />
  }
}

const ReportInputForm = ({ subjectData, studentId, marks }: Props) => {
  const getMarks = (subjectId: number, subjectGroupId: number, semester: string) => {
    const selectedMark = marks.filter(
      (item: { subjectId: number; subjectGroupId: number; semester: string }) =>
        item.subjectId === subjectId && item.subjectGroupId === subjectGroupId && item.semester === semester
    )

    return selectedMark[0]?.mark || ''
  }

  const mappedSubjectData = subjectData.map(item => {
    return {
      subject: item.subject,
      subjectId: item.subjectId,
      subjectOrder: item.subjectOrder,
      subjectGroupId: item.subjectGroupId,
      smt1: getMarks(item.subjectId, item.subjectGroupId, 'Semester 1') ?? '',
      smt2: getMarks(item.subjectId, item.subjectGroupId, 'Semester 2') ?? ''
    }
  })

  // States
  const [data, setData] = useState([...mappedSubjectData])

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    const mappedSubmitData = data.map(item => {
      const markObj = {
        'Semester 1': item.smt1,
        'Semester 2': item.smt2
      }

      const markArray = [
        {
          studentId,
          subjectId: item.subjectId,
          subjectGroupId: item.subjectGroupId,
          semester: Object.keys(markObj)[0],
          mark: Number(markObj['Semester 1'])
        },
        {
          studentId,
          subjectId: item.subjectId,
          subjectGroupId: item.subjectGroupId,
          semester: Object.keys(markObj)[1],
          mark: Number(markObj['Semester 2'])
        }
      ]

      return markArray
    })

    setIsLoading(true)

    try {
      await deleteMarkById(studentId, subjectData[0].subjectGroupId)

      await Promise.all(
        mappedSubmitData.flat().map(async item => {
          const markRes = await createMark(item)

          if (markRes.statusCode === 201) {
            toast.success(`Berhasil menambahkan data!`)
            setIsLoading(false)

            return
          }

          setIsLoading(false)

          toast.error(`Gagal menambahkan data!`)
        })
      )
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal menambahkan data!`)
    }
  }

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
    <>
      <CardContent>
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
      </CardContent>
      <Divider />
      <CardActions>
        <Button disabled={isLoading} onClick={handleSubmit} type='submit' variant='contained' className='mie-2'>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </CardActions>
    </>
  )
}

export default ReportInputForm
