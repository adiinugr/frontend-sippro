'use client'

import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

interface Props {
  reset: () => void
}

const AddActions = ({ reset }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='tabler-device-floppy' />}
            >
              Simpan
            </Button>
            <Button fullWidth color='secondary' variant='tonal' className='capitalize' onClick={() => reset()}>
              Reset
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

export default AddActions
