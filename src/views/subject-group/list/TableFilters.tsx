// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData,
  lessonYearData,
  gradeData
}: {
  setData: (data: SubjectGroupType[]) => void
  tableData?: SubjectGroupType[]
  lessonYearData: { id: number; name: string }[]
  gradeData: { id: number; name: string }[]
}) => {
  // States
  const [studyYear, setStudyYear] = useState<SubjectGroupType['studyYear']>('')
  const [grade, setGrade] = useState<SubjectGroupType['grade']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (studyYear && item.studyYear !== studyYear) return false
      if (grade && item.grade !== grade) return false

      return true
    })

    setData(filteredData || [])
  }, [studyYear, grade, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-study-year'
            value={studyYear}
            onChange={e => setStudyYear(e.target.value)}
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
