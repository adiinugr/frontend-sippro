// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { StudentType } from '@/types/usersTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: StudentType[]) => void
  tableData?: StudentType[]
}) => {
  // States
  const [classroom, setClassroom] = useState<StudentType['classroom']>('')
  const [nominationStatus, setNominationStatus] = useState<StudentType['nominationStatus']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(student => {
      if (classroom && student.classroom !== classroom) return false
      if (nominationStatus && student.nominationStatus !== nominationStatus) return false

      return true
    })

    setData(filteredData || [])
  }, [classroom, nominationStatus, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-classroom'
            value={classroom}
            onChange={e => setClassroom(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Pilih Kelas</MenuItem>
            <MenuItem value='XII-A'>XII-A</MenuItem>
            <MenuItem value='XII-B'>XII-B</MenuItem>
            <MenuItem value='XII-C'>XII-C</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-nomination-status'
            value={nominationStatus}
            onChange={e => setNominationStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Pilih Status Nominasi</MenuItem>
            <MenuItem value='Initiating'>Initiating</MenuItem>
            <MenuItem value='Waiting for Validation'>Waiting for Validation</MenuItem>
            <MenuItem value='Validated'>Validated</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
