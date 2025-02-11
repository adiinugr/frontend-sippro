import { redirect } from 'next/navigation'

// Components
import StudentProfile from '@/views/user/student/profile'
import DataError from '@/components/other/DataError'

// Libs & Actions
import { auth } from '@/libs/auth'
import { getStudentById } from '@/libs/actions/students'

// Types
import type { Session } from '@/types/auth'

export default async function StudentProfilePage({ params }: { params: { id: number } }) {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: student, statusCode } = await getStudentById(params.id)

  if (statusCode === 404) {
    redirect('/not-found')
  }

  if (!student) {
    return <DataError />
  }

  return <StudentProfile data={{ result: student }} />
}
