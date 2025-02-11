// Actions
import { getStudentById } from '@/libs/actions/students'

// Compopnents
import Achievement from '@/views/user/student/achievement'
import DataError from '@/components/other/DataError'
import type { StudentType } from '@/types/usersTypes'

export default async function StudentAchievementPage({ params }: { params: { id: number } }) {
  const data = await getStudentById(params.id)

  if (data.statusCode !== 200) {
    return <DataError />
  }

  return data ? <Achievement studentData={data.result as StudentType} /> : null
}
