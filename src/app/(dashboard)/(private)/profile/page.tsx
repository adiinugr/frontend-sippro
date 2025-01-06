import { redirect } from 'next/navigation'

import { Grid } from '@mui/material'

// Components
import UserStudentEdit from '@/views/user/student/edit'
import UserTeacherEdit from '@/views/user/teacher/edit'

// Libs
import { auth } from '@/libs/auth'

// Actons
import { getStudentById } from '@/libs/actions/students'
import { getTeacherById } from '@/libs/actions/teachers'

const StudentEditPage = async () => {
  const session = await auth()

  // Vars
  const studentData = await getStudentById(Number(session?.user?.id))
  const teacherData = await getTeacherById(Number(session?.user?.id))

  if (studentData.statusCode === 404 || teacherData.statusCode === 404 || !session) {
    redirect('/not-found')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {session.user.status === 'student' ? (
          <UserStudentEdit selectedData={studentData.result} />
        ) : (
          <UserTeacherEdit selectedData={teacherData.result} />
        )}
      </Grid>
    </Grid>
  )
}

export default StudentEditPage
