// Next Imports
import { redirect } from 'next/navigation'

// Components
import SubjectList from '@/views/subject/list'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchSubjects } from '@/libs/actions/subjects'

// Types
import type { Session } from '@/types/auth'

export default async function SubjectListPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: subjects } = await fetchSubjects()

  return <SubjectList subjectData={subjects} />
}
