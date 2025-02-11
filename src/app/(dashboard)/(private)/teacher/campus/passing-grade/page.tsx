// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusPassingGrade from '@/views/campus/passing-grade'

// Libs & Actions
import { auth } from '@/libs/auth'

// Types
import type { Session } from '@/types/auth'

export default async function TeacherPassingGradePage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  return <CampusPassingGrade />
}
