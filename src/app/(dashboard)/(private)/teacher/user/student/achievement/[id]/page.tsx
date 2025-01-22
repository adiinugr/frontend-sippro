import { redirect } from 'next/navigation'

// Actions
import { getStudentById } from '@/libs/actions/students'

// Compopnents
import Achievement from '@/views/user/student/achievement'

export default async function StudentAchievementPage({ params }: { params: { id: number } }) {
  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <Achievement studentData={data.result} /> : null
}
