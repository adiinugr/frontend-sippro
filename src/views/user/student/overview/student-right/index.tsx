import React from 'react'

import { Card, CardContent, CardHeader, Grid } from '@mui/material'

import GreetingCard from '@/views/user/student/overview/student-right/GreetingCard'
import ReportBarChart from '@/views/user/student/overview/student-right/ReportBarChart'
import SubjectLineChart from '@/views/user/student/overview/student-right/SubjectLineChart'

type Props = { subjectProgresData: any }

function StudentRight({ subjectProgresData }: Props) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GreetingCard />
      </Grid>
      <Grid item xs={12}>
        <ReportBarChart />
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
