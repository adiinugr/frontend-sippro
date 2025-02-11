import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

export default function DataError() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='p-10 grid place-content-center'>
            <Alert severity='error' className='text-red-800 bg-red-50'>
              Terjadi kendala saat request data. Silakan hubungi Admin!
            </Alert>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
