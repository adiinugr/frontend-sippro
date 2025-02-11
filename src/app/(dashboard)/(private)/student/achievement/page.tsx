// Next Imports
import { redirect } from 'next/navigation'

// Libs & Actions
import { getStudentById } from '@/libs/actions/students'
import { auth } from '@/libs/auth'

// Components
import Achievement from '@/views/user/student/achievement'
import DataError from '@/components/other/DataError'
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

export default async function AchievementPage() {
  // Get auth session
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  if (session.user.status !== 'student') {
    redirect('/dashboard')
  }

  // Fetch student data
  const studentData = await getStudentById(Number(session.user.id))

  // Handle error states
  if (!studentData || studentData.statusCode !== 200) {
    return <DataError />
  }

  return <Achievement studentData={studentData.result as StudentType} />
}
