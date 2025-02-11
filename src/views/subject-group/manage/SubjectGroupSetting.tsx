'use client'

// React Import
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

// Mui Import
import { TabContext, TabPanel } from '@mui/lab'
import { Card, CardContent, CardHeader, Tab } from '@mui/material'

// Components Import
import CustomTabList from '@/@core/components/mui/TabList'
import ManageClassroomListTable from '@/views/subject-group/manage/ManageClassroomListTable'
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

interface ClassroomDataProps {
  subjectGroup: {
    id: number
    name: string
  }
  classroomData: SubjectGroupType['clsrmsToSbjgs']
}

const SubjectGroupSetting = ({ subjectGroup, classroomData }: ClassroomDataProps) => {
  // States
  const [value, setValue] = useState<string>(classroomData[0].classroom.name)

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
              <Tab key={val.classroom.id} value={val.classroom.name} label={val.classroom.name} />
            ))}
          </CustomTabList>

          {classroomData.map(val => (
            <TabPanel key={val.classroom.name} value={val.classroom.name}>
              <ManageClassroomListTable
                classroomsToSubjectGroupId={val.id}
                tableData={val.stdsToSbjgsToClsrms}
                classroom={val.classroom.name}
                subjectGroup={subjectGroup}
              />
            </TabPanel>
          ))}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default SubjectGroupSetting
