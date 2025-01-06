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

// Actions
import { fetchClassrooms } from '@/libs/actions/classrooms'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: StudentType[]) => void
  tableData?: StudentType[]
}) => {
  // States
  const [classroom, setClassroom] = useState<string>('')

  // const [nominationStatus, setNominationStatus] = useState<StudentType['nominationStatus']>('')

  const [classrromData, setClassroomData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const classroomRes = await fetchClassrooms()

      setClassroomData(classroomRes.result)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filteredData = tableData?.filter(student => {
      const mappedClassroom = student.stTSbgTc.map(value => {
        return value.clsrmsToSbjg.classroom.name
      })

      if (classroom && !mappedClassroom.includes(classroom)) return false

      // if (nominationStatus && student.nominationStatus !== nominationStatus) return false

      return true
    })

    setData(filteredData || [])
  }, [classroom, tableData, setData])

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

            {classrromData.map((classroom: { id: number; name: string }) => (
              <MenuItem key={classroom.id} value={classroom.name}>
                {classroom.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
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
        </Grid> */}
      </Grid>
    </CardContent>
  )
}

export default TableFilters
