'use client'

import Grid from '@mui/material/Grid'

import DashboardHeader from '@/views/dashboard/teacher/DashboardHeader'

// MUI Imports

const TeacherDashboard = () => {
  // States

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DashboardHeader />
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
