// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getSubjectGroupById } from '@/libs/actions/subjectGroups'

// Components
import SubjectGroupManage from '@/views/subject-group/manage'

const ManagePage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getSubjectGroupById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupManage selectedSubjectGroup={data.result} />
      </Grid>
    </Grid>
  ) : null
}

export default ManagePage
