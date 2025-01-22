import { redirect } from 'next/navigation'

// Libs
import { getStudentById } from '@/libs/actions/students'
import { auth } from '@/libs/auth'

// Components
import Achievement from '@/views/user/student/achievement'

export default async function AchievementPage() {
  const session = await auth()

  const data = await getStudentById(Number(session?.user?.id))

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <Achievement studentData={data.result} /> : null
}
