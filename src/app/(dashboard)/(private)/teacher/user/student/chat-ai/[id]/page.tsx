// Components
import ChatAi from '@/views/user/student/chat-ai'
import DataError from '@/components/other/DataError'

// Actions
import { getStudentById } from '@/libs/actions/students'

// Types
import type { StudentType } from '@/types/usersTypes'

export default async function StudentAiPage({ params }: { params: { id: number } }) {
  const data = await getStudentById(params.id)

  if (data.statusCode !== 200) {
    return <DataError />
  }

  return data ? <ChatAi studentData={data.result as StudentType} /> : null
}
