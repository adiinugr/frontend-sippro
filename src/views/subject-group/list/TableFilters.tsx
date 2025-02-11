// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type TableData = {
  id: number
  name: string
  lessonYear: string
  grade: string
}

const TableFilters = ({
  setData,
  tableData,
  lessonYearData,
  gradeData
}: {
  setData: (data: any) => void
  tableData?: TableData[]
  lessonYearData: { id: number; name: string }[]
  gradeData: { id: number; name: string }[]
}) => {
  // States
  const [lessonYear, setLessonYear] = useState('')
  const [grade, setGrade] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (lessonYear && item.lessonYear !== lessonYear) return false
      if (grade && item.grade !== grade) return false

      return true
    })

    setData(filteredData || [])
  }, [lessonYear, grade, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-study-year'
            value={lessonYear}
            onChange={e => setLessonYear(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Pilih Tahun Pelajaran</MenuItem>
            {lessonYearData.map((data: { id: number; name: string }) => (
              <MenuItem key={data.id} value={data.name}>
                {data.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-grade'
            value={grade}
            onChange={e => setGrade(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Pilih Jenjang</MenuItem>
            {gradeData.map((data: { id: number; name: string }) => (
              <MenuItem key={data.id} value={data.name}>
                {data.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
