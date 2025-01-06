import { redirect } from 'next/navigation'

import { getStudentById } from '@/libs/actions/students'
import ChatAi from '@/views/user/student/chat-ai'

export default async function StudentAiPage({ params }: { params: { id: number } }) {
  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <ChatAi studentData={data.result} /> : null
}
