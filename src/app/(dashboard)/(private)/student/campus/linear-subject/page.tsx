// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusLinearSubject from '@/views/campus/linear-subject'

// Libs & Actions
import { auth } from '@/libs/auth'

type UserStatus = 'student' | 'teacher'

interface User {
  id: string
  status: UserStatus
}

interface Session {
  user: User
}

export default async function LinearSubjectPage() {
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  if (session.user.status !== 'student') {
    redirect('/dashboard')
  }

  return <CampusLinearSubject />
}
