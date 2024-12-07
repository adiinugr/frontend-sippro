// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import { Alert, Card } from '@mui/material'

import type { ClassroomType } from '@/types/classroomTypes'

// Component Imports
import ClassroomListTable from './ClassroomListTable'

const ClassroomList = async ({ classroomData }: { classroomData?: ClassroomType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Alert severity='warning' className='text-orange-800 bg-orange-50'>
            Perhatian! Bahwasanya sebelum menambah data <span className='font-bold'>Kelas</span>, harus ditambahkan data{' '}
            <span className='font-bold'>Jenjang</span> terlebih dahulu.
          </Alert>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ClassroomListTable tableData={classroomData} />
      </Grid>
    </Grid>
  )
}

export default ClassroomList
