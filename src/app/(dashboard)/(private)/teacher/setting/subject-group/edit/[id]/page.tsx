// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getSubjectGroupById } from '@/libs/actions/subjectGroups'

// Components
import SubjectGroupEditList from '@/views/subject-group/edit'

const EditPage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getSubjectGroupById(params.id)

  if (!data) {
    redirect('/not-found')
  }

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupEditList selectedData={data.result} />
      </Grid>
    </Grid>
  ) : null
}

export default EditPage
