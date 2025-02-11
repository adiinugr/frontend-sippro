import { redirect } from 'next/navigation'

import { Grid } from '@mui/material'

// Components
import UserTeacherEdit from '@/views/user/teacher/edit'

// Actons
import { getTeacherById } from '@/libs/actions/teachers'

// Types
import type { TeacherType } from '@/types/usersTypes'

const TeacherEditPage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getTeacherById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTeacherEdit selectedData={data.result as TeacherType} />
      </Grid>
    </Grid>
  ) : null
}

export default TeacherEditPage
