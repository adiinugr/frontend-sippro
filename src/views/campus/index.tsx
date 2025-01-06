'use client'

import Grid from '@mui/material/Grid'

import CampusHeader from '@/views/campus/CampusHeader'

// MUI Imports

const Campus = () => {
  // States

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CampusHeader />
      </Grid>
    </Grid>
  )
}

export default Campus
