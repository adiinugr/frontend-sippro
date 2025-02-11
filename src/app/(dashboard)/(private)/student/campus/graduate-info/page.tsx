// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusGraduateInfo from '@/views/campus/graduate-info'

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

export default async function GraduateInfoPage() {
  // Get auth session
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  if (session.user.status !== 'student') {
    redirect('/dashboard')
  }

  return <CampusGraduateInfo />
}
