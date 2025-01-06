'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { Alert, CircularProgress } from '@mui/material'

// Custom Components Import
import ReportInputForm from '@/views/user/student/report/ReportInputForm'
import CustomTabList from '@/@core/components/mui/TabList'

// Types
import type { StudentType } from '@/types/usersTypes'

interface Props {
  studentData: StudentType
}

const ReportInput = ({ studentData }: Props) => {
  const [value, setValue] = useState(studentData.stTSbgTc[0]?.clsrmsToSbjg.subjectGroup.lessonYear.name)

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <CardHeader title='Input Nilai Raport' />

      {studentData.stTSbgTc.length === 0 && (
        <CardContent className='p-10 grid place-content-center'>
          <Alert severity='warning' className='text-orange-800 bg-orange-50'>
            Data kelompok mapel dan kelas belum ditambahkan. Silakan hubungi Admin!
          </Alert>
        </CardContent>
      )}

      {studentData ? (
        <TabContext value={value}>
          <CustomTabList pill='true' onChange={handleTabChange} className='border-be px-7'>
            {studentData.stTSbgTc.map(item => (
              <Tab
                key={item.clsrmsToSbjg.id}
                label={item.clsrmsToSbjg.subjectGroup.lessonYear.name}
                value={item.clsrmsToSbjg.subjectGroup.lessonYear.name}
              />
            ))}
          </CustomTabList>

          {studentData.stTSbgTc.map(item => (
            <TabPanel key={item.clsrmsToSbjg.id} value={item.clsrmsToSbjg.subjectGroup.lessonYear.name}>
              <ReportInputForm
                subjectData={item.clsrmsToSbjg.subjectGroup.sbjsToSbjgs}
                marks={studentData.marks}
                studentId={studentData.id}
              />
            </TabPanel>
          ))}
        </TabContext>
      ) : (
        <CardContent className='p-10 grid place-content-center'>
          <CircularProgress />
        </CardContent>
      )}
    </Card>
  )
}

export default ReportInput
