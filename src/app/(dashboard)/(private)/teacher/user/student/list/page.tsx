// Next Imports
import { redirect } from 'next/navigation'

// Components
import UserStudentList from '@/views/user/student/list'
import DataError from '@/components/other/DataError'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchStudents } from '@/libs/actions/students'

// Types
import type { Session } from '@/types/auth'

export default async function StudentListPage() {
  // Check auth and fetch data in parallel
  const [session, { result: students }] = await Promise.all([auth() as Promise<Session | null>, fetchStudents()])

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  if (!students) {
    return <DataError />
  }

  return <UserStudentList userStudentData={students} />
}
