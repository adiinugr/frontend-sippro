// Next Imports
import { redirect } from 'next/navigation'

// Components
import GradeList from '@/views/grade/list'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchGrades } from '@/libs/actions/grades'

// Types
import type { Session } from '@/types/auth'

export default async function GradePage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: grades } = await fetchGrades()

  return <GradeList gradeData={grades} />
}
