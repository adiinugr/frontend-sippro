// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import { Alert, Card } from '@mui/material'

import type { SubjectGroupType } from '@/types/subjectGroupTypes'

// Component Imports
import SubjectGroupListTable from './SubjectGroupListTable'
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'

const SubjectGroupList = async ({ subjectGroupData }: { subjectGroupData?: SubjectGroupType[] }) => {
  const lessonYearRes = await fetchLessonYears()
  const gradeRes = await fetchGrades()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Alert severity='warning' className='text-orange-800 bg-orange-50'>
            Perhatian! Bahwasanya sebelum menambah data kelompok mapel, harus ditambahkan data{' '}
            <span className='font-bold'>Tahun Pelajaran</span>, <span className='font-bold'>Jenjang</span>,{' '}
            <span className='font-bold'>Kelas</span>, dan <span className='font-bold'>Mata Pelajaran</span>
          </Alert>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <SubjectGroupListTable
          lessonYearData={lessonYearRes.result}
          gradeData={gradeRes.result}
          tableData={subjectGroupData}
        />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupList
