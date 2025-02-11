// React Imports
import { useState, useEffect, forwardRef } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Third Party
import { format, isAfter, isBefore, startOfYear } from 'date-fns'

// Type Imports
import type { TextFieldProps } from '@mui/material'

import type { ViolationType } from '@/types/violationTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Utils
import { MenuProps } from '@/utils/select'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { orderLessonYear } from '@/utils/lessonYear'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number | null
  start: Date | number | null
}

const TableFilters = ({
  setData,
  tableData,
  selectedClassroom,
  setSelectedClassroom,
  classroomData
}: {
  setData: (data: ViolationType[]) => void
  tableData?: ViolationType[]
  selectedClassroom: string
  setSelectedClassroom: (value: string) => void
  classroomData: { id: number; name: string }[]
}) => {
  const [startDateRange, setStartDateRange] = useState<Date | null>(startOfYear(new Date()))
  const [endDateRange, setEndDateRange] = useState<Date | null>(new Date())

  useEffect(() => {
    const filteredData = tableData?.filter(violation => {
      const mappedClassroom = orderLessonYear(violation.student.stTSbgTc)
        .slice(-1)
        .map(value => value.clsrmsToSbjg.classroom.name)

      if (selectedClassroom && selectedClassroom !== 'all' && !mappedClassroom.includes(selectedClassroom)) return false

      const violationDate = new Date(violation.date)

      if (!startDateRange || !endDateRange) return true
      if (isBefore(violationDate, startDateRange) || isAfter(violationDate, endDateRange)) return false

      return true
    })

    setData(filteredData || [])
  }, [selectedClassroom, tableData, setData, startDateRange, endDateRange])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = start ? format(start, 'MM/dd/yyyy') : ''
    const endDate = end ? ` - ${format(end, 'MM/dd/yyyy')}` : ''

    const value = `${startDate}${endDate}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            value={selectedClassroom}
            onChange={e => setSelectedClassroom(e.target.value)}
            SelectProps={{ displayEmpty: true, MenuProps }}
            label='Pilih Kelas'
          >
            <MenuItem value='all'>Semua Kelas</MenuItem>
            {classroomData.map(classroom => (
              <MenuItem key={classroom.id} value={classroom.name}>
                {classroom.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppReactDatepicker
            selectsRange
            monthsShown={2}
            endDate={endDateRange as Date}
            selected={startDateRange}
            startDate={startDateRange as Date}
            shouldCloseOnSelect={false}
            id='date-range-picker-months'
            onChange={(dates: any) => {
              if (!dates[0] && !dates[1]) {
                setStartDateRange(null)
                setEndDateRange(null)
              } else {
                handleOnChangeRange(dates)
              }
            }}
            isClearable
            customInput={
              <CustomInput
                label='Pilih Tanggal'
                end={endDateRange as Date | number}
                start={startDateRange as Date | number}
              />
            }
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
