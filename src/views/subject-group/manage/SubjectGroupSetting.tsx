'use client'

import type { SyntheticEvent } from 'react'

import { useState } from 'react'

import { TabContext, TabPanel } from '@mui/lab'

import { Card, CardContent, CardHeader, Tab } from '@mui/material'

import CustomTabList from '@/@core/components/mui/TabList'
import ManageClassroomListTable from '@/views/subject-group/manage/ManageClassroomListTable'

interface ClassroomDataProps {
  subjectGroup: {
    id: number
    name: string
  }
  classroomData: {
    classroom: string
    data: {
      classroom: {
        id: number
        name: string
      }
      student: {
        id: number
        name: string
        nis: string
        nisn: string
      }
    }[]
  }[]
}

const SubjectGroupSetting = ({ subjectGroup, classroomData }: ClassroomDataProps) => {
  // States
  const [value, setValue] = useState<string>(classroomData[0].classroom)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <CardHeader title='Data Kelas' />
      <CardContent>
        <TabContext value={value}>
          <CustomTabList pill='true' onChange={handleChange} aria-label='customized tabs example'>
            {classroomData.map(val => (
              <Tab key={val.classroom} value={val.classroom} label={val.classroom} />
            ))}
          </CustomTabList>

          {classroomData.map(val => (
            <TabPanel key={val.classroom} value={val.classroom}>
              <ManageClassroomListTable tableData={val.data} classroom={val.classroom} subjectGroup={subjectGroup} />
            </TabPanel>
          ))}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default SubjectGroupSetting
