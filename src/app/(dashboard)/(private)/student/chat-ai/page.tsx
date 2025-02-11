// Next Imports
import { redirect } from 'next/navigation'

// Libs
import { getStudentById } from '@/libs/actions/students'
import { auth } from '@/libs/auth'

// Components
import ChatAi from '@/views/user/student/chat-ai'
import DataError from '@/components/other/DataError'

// Types
type UserStatus = 'student' | 'teacher'

interface User {
  id: string
  status: UserStatus
}

interface Session {
  user: User
}

export default async function StudentAiPage() {
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

  if (!studentData.result) {
    return <DataError />
  }

  return <ChatAi studentData={studentData.result} />
}
