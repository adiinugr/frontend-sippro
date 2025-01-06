import { redirect } from 'next/navigation'

import { Grid } from '@mui/material'

// Components
import UserTeacherEdit from '@/views/user/teacher/edit'

// Actons
import { getTeacherById } from '@/libs/actions/teachers'

const TeacherEditPage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getTeacherById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTeacherEdit selectedData={data.result} />
      </Grid>
    </Grid>
  ) : null
}

export default TeacherEditPage
