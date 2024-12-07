// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import { Button, CardActions } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'

const StudentReportStats = () => {
  // Props

  return (
    <Card className='bs-full'>
      <CardContent>
        <div className='flex items-center flex-wrap gap-2 justify-between'>
          <div className='flex flex-col gap-x-4 gap-y-0.5'>
            <Typography variant='h5'>Nilai Raport</Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              Data Submit Nilai Raport
            </Typography>
          </div>
          <CustomAvatar variant='rounded' color='primary' skin='filled' size={42}>
            <i className={classnames('tabler-report-analytics', 'text-[26px]')} />
          </CustomAvatar>
        </div>
        <div className='flex justify-between items-center mt-8'>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='success' skin='light-static' size={32}>
              <i className={classnames('tabler-circle-check', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 1</Typography>
          </div>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='success' skin='light-static' size={32}>
              <i className={classnames('tabler-circle-check', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 2</Typography>
          </div>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='success' skin='light-static' size={32}>
              <i className={classnames('tabler-circle-check', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 3</Typography>
          </div>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='success' skin='light-static' size={32}>
              <i className={classnames('tabler-circle-check', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 4</Typography>
          </div>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='error' skin='light-static' size={32}>
              <i className={classnames('tabler-playstation-x', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 5</Typography>
          </div>
          <div className='grid place-items-center gap-1'>
            <CustomAvatar variant='rounded' color='error' skin='light-static' size={32}>
              <i className={classnames('tabler-playstation-x', 'text-[22px]')} />
            </CustomAvatar>
            <Typography variant='subtitle2'>SMT 6</Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button variant='tonal'>Input Nilai</Button>
      </CardActions>
    </Card>
  )
}

export default StudentReportStats
