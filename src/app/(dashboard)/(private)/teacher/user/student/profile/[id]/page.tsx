import { redirect } from 'next/navigation'

// Actions
import { getStudentById } from '@/libs/actions/students'
import StudentProfile from '@/views/user/student/profile'

const ProfilePage = async ({ params }: { params: { id: number } }) => {
  // Vars

  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <StudentProfile data={data} /> : null
}

export default ProfilePage
