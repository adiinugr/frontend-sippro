'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import { useSession } from 'next-auth/react'

import CustomAvatar from '@core/components/mui/Avatar'

// Type
type Props = {
  studentMarksBySemester: {
    semester: number
    marks: any[]
  }[]
}

const StudentReportStats = ({ studentMarksBySemester }: Props) => {
  // Props
  const { data: session } = useSession()

  const userStatus = session ? session.user.status : null

  return (
    <Card>
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
          {studentMarksBySemester.map((mark: { semester: number; marks: any[] }) => (
            <div key={mark.semester} className='grid place-items-center gap-1'>
              <CustomAvatar
                variant='rounded'
                color={mark.marks.length > 0 && mark.marks.every(val => val.mark !== 0) ? 'success' : 'error'}
                skin='light-static'
                size={32}
              >
                <i
                  className={`${mark.marks.length > 0 && mark.marks.every(val => val.mark !== 0) ? 'tabler-circle-check' : 'tabler-playstation-x'} text-[22px]`}
                />
              </CustomAvatar>
              <Typography variant='subtitle2'>{`SMT ${mark.semester}`}</Typography>
            </div>
          ))}
        </div>
      </CardContent>
      {userStatus === 'student' && (
        <CardActions>
          <Button href='/student/report' variant='tonal'>
            Input Nilai
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default StudentReportStats
