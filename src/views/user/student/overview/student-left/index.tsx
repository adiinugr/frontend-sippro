import React from 'react'

import { Grid } from '@mui/material'

import StudentInfo from '@/views/user/student/overview/student-left/StudentInfo'
import StudentReportStats from '@/views/user/student/overview/student-left/StudentReportStats'

export type StudentDataProps = {
  studentData: {
    id: number
    name: string
    nis: string
    nisn: string
    placeOfBirth: string
    dateOfBirth: string
    subjectGroupsToClassroomsToStudents: {
      classrom: {
        name: string
      }
      subjectGroup: {
        lessonYear: {
          name: string
        }
      }
    }[]
  }
}

const StudentLeft = ({ studentData }: StudentDataProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StudentInfo studentData={studentData} />
      </Grid>
      <Grid item xs={12}>
        <StudentReportStats />
      </Grid>
    </Grid>
  )
}

export default StudentLeft
