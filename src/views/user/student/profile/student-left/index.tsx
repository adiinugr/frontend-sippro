import React from 'react'

// MUI Import
import { Grid } from '@mui/material'

// Components
import StudentInfo from '@/views/user/student/profile/student-left/StudentInfo'
import StudentReportStats from '@/views/user/student/profile/student-left/StudentReportStats'

// Types
import type { StudentType } from '@/types/usersTypes'

export type StudentDataProps = {
  studentData: StudentType
}

const StudentLeft = ({ studentData, studentMarksBySemester }: StudentDataProps & { studentMarksBySemester: any }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StudentInfo studentData={studentData} />
      </Grid>
      <Grid item xs={12}>
        <StudentReportStats studentMarksBySemester={studentMarksBySemester} />
      </Grid>
    </Grid>
  )
}

export default StudentLeft
