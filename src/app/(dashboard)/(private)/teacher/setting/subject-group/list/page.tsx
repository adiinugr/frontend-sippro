// MUI Imports
import Grid from '@mui/material/Grid'

import { fetchSubjectGroups } from '@/libs/actions/subjectGroups'

// Component Imports
import SubjectGroupList from '@views/subject-group/list'

const SubjectGroupListPage = async () => {
  const subjectGroupRes = await fetchSubjectGroups()

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubjectGroupList subjectGroupData={subjectGroupRes.result} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupListPage
