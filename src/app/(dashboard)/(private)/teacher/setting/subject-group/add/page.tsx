// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import SubjectGroupAddList from '@/views/subject-group/add'

const SubjectGroupAddPage = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupAddList />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupAddPage
