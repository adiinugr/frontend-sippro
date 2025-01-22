import React from 'react'

// MUI Import
import { Card, CardContent, CardHeader, Grid } from '@mui/material'

// Components
import GreetingCard from '@/views/user/student/profile/student-right/GreetingCard'
import ReportBarChart from '@/views/user/student/profile/student-right/ReportBarChart'
import SubjectLineChart from '@/views/user/student/profile/student-right/SubjectLineChart'

// Types
import type { StudentType } from '@/types/usersTypes'

type Props = {
  studentData: StudentType
  studentMarksBySemester: {
    marks: {
      mark: number
      subject: {
        code: string
      }
    }[]
    semester: number
  }[]
  subjectProgresData: {
    subjectName: string
    subjectCode: string
    data: number[]
  }[]
}

function StudentRight({ studentMarksBySemester, subjectProgresData, studentData }: Props) {
  const tabDataFunction = () => {
    const data: { type: string; avatarIcon: string; series: { data: number[] }[]; categories: string[] }[] = []

    studentMarksBySemester.map(item => {
      const markData: number[] = []
      const subject: string[] = []

      item.marks.forEach(mark => {
        markData.push(Number(mark.mark))
        subject.push(mark.subject.code)
      })

      data.push({
        type: `smt-${item.semester}`,
        avatarIcon: `tabler-number-${item.semester}`,
        series: [{ data: markData }],
        categories: subject
      })
    })

    return data
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GreetingCard studentData={studentData} />
      </Grid>
      <Grid item xs={12}>
        <ReportBarChart tabData={tabDataFunction()} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Progres Nilai' subheader='Data fluktuasi nilai semua mapel pada tiap-tiap semester' />
          <CardContent>
            <Grid container spacing={6}>
              {subjectProgresData.map((data: any) => (
                <Grid key={data.subjectCode} item xs={12} sm={6} md={4}>
                  <SubjectLineChart data={data} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default StudentRight
