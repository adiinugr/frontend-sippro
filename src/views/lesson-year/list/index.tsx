// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { LessonYearType } from '@/types/lessonYearTypes'

// Component Imports
import LessonYearListTable from './LessonYearListTable'

const LessonYearList = async ({ lessonYearData }: { lessonYearData?: LessonYearType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LessonYearListTable tableData={lessonYearData} />
      </Grid>
    </Grid>
  )
}

export default LessonYearList
