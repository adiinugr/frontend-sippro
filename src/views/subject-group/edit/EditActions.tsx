'use client'

import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

interface Props {
  isLoading: boolean
}

const EditAction = ({ isLoading }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Button
              disabled={isLoading}
              type='submit'
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='tabler-device-floppy' />}
            >
              {isLoading ? 'Loading...' : 'Simpan'}
            </Button>
            <Button
              component={Link}
              fullWidth
              color='secondary'
              variant='tonal'
              className='capitalize'
              href='/setting/subject-group/list'
            >
              Back
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditAction
