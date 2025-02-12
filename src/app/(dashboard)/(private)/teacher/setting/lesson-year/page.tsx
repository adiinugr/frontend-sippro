// Next Imports
import { redirect } from 'next/navigation'

// Components
import LessonYear from '@/views/lesson-year/list'

// Libs & Actions
import { auth } from '@/libs/auth'

// Data
import { fetchLessonYears } from '@/libs/actions/lessonYears'

// Types
import type { Session } from '@/types/auth'

export default async function LessonYearPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: lessonYears } = await fetchLessonYears()

  return <LessonYear lessonYearData={lessonYears} />
}
