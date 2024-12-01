// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { GradeType } from '@/types/gradeTypes'

// Component Imports
import GradeListTable from './GradeListTable'

const StudyYearList = async ({ gradeData }: { gradeData?: GradeType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GradeListTable tableData={gradeData} />
      </Grid>
    </Grid>
  )
}

export default StudyYearList
