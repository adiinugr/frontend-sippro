// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import { Grid } from '@mui/material'

// Components
import UserStudentEdit from '@/views/user/student/edit'
import UserTeacherEdit from '@/views/user/teacher/edit'

// Libs & Actions
import { auth } from '@/libs/auth'
import { getStudentById } from '@/libs/actions/students'
import { getTeacherById } from '@/libs/actions/teachers'
import type { StudentType } from '@/types/usersTypes'

// Types
type UserStatus = 'student' | 'teacher'

interface User {
  id: string
  status: UserStatus
}

interface Session {
  user: User
}

const ProfilePage = async () => {
  // Get auth session
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  // Fetch user data based on status
  const userData = await (session.user.status === 'student'
    ? getStudentById(Number(session.user.id))
    : getTeacherById(Number(session.user.id)))

  if (!userData?.result) {
    redirect('/404')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {session.user.status === 'student' ? (
          <UserStudentEdit selectedData={userData.result as StudentType} />
        ) : (
          <UserTeacherEdit selectedData={userData.result} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProfilePage
