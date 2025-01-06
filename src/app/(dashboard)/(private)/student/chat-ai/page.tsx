import { redirect } from 'next/navigation'

import { getStudentById } from '@/libs/actions/students'
import ChatAi from '@/views/user/student/chat-ai'
import { auth } from '@/libs/auth'

export default async function StudentAiPage() {
  const session = await auth()

  const data = await getStudentById(Number(session?.user?.id))

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <ChatAi studentData={data.result} /> : null
}
