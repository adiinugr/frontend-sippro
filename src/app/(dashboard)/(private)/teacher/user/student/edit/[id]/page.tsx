import { redirect } from 'next/navigation'

import { Grid } from '@mui/material'

// Components
import UserStudentEdit from '@/views/user/student/edit'

// Actons
import { getStudentById } from '@/libs/actions/students'

const StudentEditPage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentEdit selectedData={data.result} />
      </Grid>
    </Grid>
  ) : null
}

export default StudentEditPage
