// Next Imports
import { redirect } from 'next/navigation'

// Libs & Actions
import { auth } from '@/libs/auth'
import { getStudentById } from '@/libs/actions/students'

// Components
import ReportInput from '@/views/user/student/report'
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

export default async function StudentReportPage() {
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

  if (!studentData || studentData.statusCode !== 200) {
    return <DataError />
  }

  return <ReportInput studentData={studentData.result as StudentType} />
}
