// Next Imports
import { redirect } from 'next/navigation'

// Components
import ClassroomList from '@/views/classroom/list'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchClassrooms } from '@/libs/actions/classrooms'

// Types
import type { Session } from '@/types/auth'
import type { ClassroomType } from '@/types/classroomTypes'

export default async function ClassroomPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: classrooms } = await fetchClassrooms()

  return <ClassroomList classroomData={classrooms as ClassroomType[]} />
}
