// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusLinearSubject from '@/views/campus/linear-subject'

// Libs & Actions
import { auth } from '@/libs/auth'

// Types
import type { Session } from '@/types/auth'

export default async function TeacherLinearSubjectPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  return <CampusLinearSubject />
}
