'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'

// Custom Components Import
import ReportInputFirstSemester from '@/views/user/student/report/ReportInputFirstSemester'
import ReportInputSecondSemester from '@/views/user/student/report/ReportInputSecondSemester'
import CustomTabList from '@/@core/components/mui/TabList'

const ReportInput = () => {
  const [value, setValue] = useState('smt1-2')

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <CardHeader title='Input Nilai Raport' />
      <TabContext value={value}>
        <CustomTabList pill='true' onChange={handleTabChange} className='border-be px-7'>
          <Tab label='Semester 1 s/d 2' value='smt1-2' />
          <Tab label='Semester 3 s/d 6' value='smt3-6' />
        </CustomTabList>
        <CardContent>
          <TabPanel value='smt1-2'>
            <ReportInputFirstSemester />
          </TabPanel>
          <TabPanel value='smt3-6'>
            <ReportInputSecondSemester />
          </TabPanel>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
        </CardActions>
      </TabContext>
    </Card>
  )
}

export default ReportInput
