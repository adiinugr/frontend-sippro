// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusPassingGrade from '@/views/campus/passing-grade'

// Libs & Actions
import { auth } from '@/libs/auth'

// Types
type UserStatus = 'student' | 'teacher'

interface User {
  id: string
  status: UserStatus
}

interface Session {
  user: User
}

export default async function PassingGradePage() {
  // Get auth session
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  if (session.user.status !== 'student') {
    redirect('/dashboard')
  }

  return <CampusPassingGrade />
}
