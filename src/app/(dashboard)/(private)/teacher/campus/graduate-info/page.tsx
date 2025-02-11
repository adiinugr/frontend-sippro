// Next Imports
import { redirect } from 'next/navigation'

// Components
import CampusGraduateInfo from '@/views/campus/graduate-info'

// Libs & Actions
import { auth } from '@/libs/auth'

// Types
import type { Session } from '@/types/auth'

export default async function TeacherGraduateInfoPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  return <CampusGraduateInfo />
}
