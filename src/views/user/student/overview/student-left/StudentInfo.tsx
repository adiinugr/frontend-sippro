// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Type Imports

import CustomAvatar from '@core/components/mui/Avatar'
import type { StudentDataProps } from '@/views/user/student/overview/student-left'
import { sortedClassroomArray } from '@/utils/sortedClassroomArray'

const StudentInfo = ({ studentData }: StudentDataProps) => {
  const isoStringToDate = (isoString: string) => {
    const date = new Date(isoString)

    return date.toLocaleDateString('id-Id')
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
                <Typography variant='h5'>{`${studentData.name}`}</Typography>
              </div>
            </div>
            <div className='flex items-center justify-around flex-wrap gap-4'>
              {sortedClassroomArray(studentData.subjectGroupsToClassroomsToStudents).map(val => (
                <div key={val.classroom.name} className='flex items-center gap-4'>
                  <div>
                    <Typography variant='h5' className='text-primary'>
                      {val.classroom.name}
                    </Typography>
                    <Typography>{val.subjectGroup.lessonYear.name}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Typography variant='h5'>Biodata</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  NIS:
                </Typography>
                <Typography>{studentData.nis}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  NISN:
                </Typography>
                <Typography>{studentData.nisn}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Tempat, Tanggal Lahir:
                </Typography>
                <Typography>{`${studentData.placeOfBirth}, ${isoStringToDate(studentData.dateOfBirth)}`}</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default StudentInfo
