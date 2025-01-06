'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Type Imports
import CustomAvatar from '@core/components/mui/Avatar'
import type { StudentDataProps } from '@/views/user/student/profile/student-left'

// Actions
import { fetchLessonYears } from '@/libs/actions/lessonYears'

const StudentInfo = ({ studentData }: StudentDataProps) => {
  const [lessonYearData, setLessonYearData] = useState([])

  const isoStringToDate = (isoString: string) => {
    const date = new Date(isoString)

    return date.toLocaleDateString('id-Id')
  }

  useEffect(() => {
    async function fetchData() {
      const lessonYearRes = await fetchLessonYears()

      setLessonYearData(lessonYearRes.result)
    }

    fetchData()
  }, [])

  const filteredLessonYear = (id: number) => {
    const filtered: { name: string }[] = lessonYearData.filter((item: { id: number }) => item.id == id)

    return filtered[0].name
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar color='primary' variant='rounded' size={120}>
                  <i className='tabler-user text-[3rem]' />
                </CustomAvatar>
                <Typography variant='h5'>{`${studentData.name}`}</Typography>
              </div>
            </div>
            <div className='flex items-center justify-around flex-wrap gap-4'>
              {studentData.stTSbgTc.map(val => (
                <div key={val.clsrmsToSbjg.classroom.id} className='flex items-center gap-4'>
                  <div>
                    <Typography variant='h5' className='text-primary'>
                      {val.clsrmsToSbjg.classroom.name}
                    </Typography>

                    {lessonYearData.length > 0 && (
                      <Typography>{filteredLessonYear(val.clsrmsToSbjg.subjectGroup.lessonYear.id)}</Typography>
                    )}
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
