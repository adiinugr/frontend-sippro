// Next Imports
import { redirect } from 'next/navigation'

// Components
import StudyYearList from '@/views/study-year/list'

// Libs & Actions
import { auth } from '@/libs/auth'

// Data
import { fetchLessonYears } from '@/libs/actions/lessonYears'

// Types
import type { Session } from '@/types/auth'

export default async function StudyYearPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: lessonYears } = await fetchLessonYears()

  return <StudyYearList studyYearData={lessonYears} />
}
