// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components
import UserStudentEdit from '@/views/user/student/edit'
import DataError from '@/components/other/DataError'

// Actions
import { auth } from '@/libs/auth'
import { getStudentById } from '@/libs/actions/students'

// Types
import type { Session } from '@/types/auth'
import type { StudentType } from '@/types/usersTypes'

export default async function StudentEditPage({ params }: { params: { id: number } }) {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: student, statusCode } = await getStudentById(params.id)

  if (statusCode !== 200) {
    return <DataError />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentEdit selectedData={student as StudentType} />
      </Grid>
    </Grid>
  )
}
