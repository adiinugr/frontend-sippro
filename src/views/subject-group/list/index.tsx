// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

// Component Imports
import SubjectGroupListTable from './SubjectGroupListTable'

const SubjectGroupList = ({ subjectGroupData }: { subjectGroupData?: SubjectGroupType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupListTable tableData={subjectGroupData} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupList
