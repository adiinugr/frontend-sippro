// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { StudyYearType } from '@/types/studyYearTypes'

// Component Imports
import StudyYearListTable from './StudyYearListTable'

const StudyYearList = async ({ studyYearData }: { studyYearData?: StudyYearType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StudyYearListTable tableData={studyYearData} />
      </Grid>
    </Grid>
  )
}

export default StudyYearList
