// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
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
