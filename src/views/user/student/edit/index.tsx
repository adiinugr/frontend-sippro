'use client'

// React Import
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Import
import { TabContext, TabPanel } from '@mui/lab'
import { Grid, Tab } from '@mui/material'

// Components Import
import CustomTabList from '@/@core/components/mui/TabList'
import StudentIdentity from '@/views/user/student/edit/StudentIdentity'
import StudentChangePassword from '@/views/user/student/edit/StudentChangePassword'
import type { StudentType } from '@/types/usersTypes'

const UserStudentEdit = ({ selectedData }: { selectedData: StudentType }) => {
  // States
  const [activeTab, setActiveTab] = useState('identity')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab icon={<i className='tabler-users' />} value='identity' label='Identitas' iconPosition='start' />
            <Tab icon={<i className='tabler-lock' />} value='security' label='Keamanan' iconPosition='start' />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value='identity' className='p-0'>
            <StudentIdentity studentData={selectedData} />
          </TabPanel>
          <TabPanel value='security' className='p-0'>
            <StudentChangePassword studentId={selectedData.id} />
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default UserStudentEdit
