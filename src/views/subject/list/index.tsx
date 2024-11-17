// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { SubjectType } from '@/types/subjectTypes'

// Component Imports
import SubjectListTable from './SubjectListTable'

const SubjectList = ({ subjectData }: { subjectData?: SubjectType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectListTable tableData={subjectData} />
      </Grid>
    </Grid>
  )
}

export default SubjectList
