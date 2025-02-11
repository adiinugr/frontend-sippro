// Actions
import { getStudentById } from '@/libs/actions/students'

// Components
import ReportInput from '@/views/user/student/report'
import DataError from '@/components/other/DataError'

// Types
import type { StudentType } from '@/types/usersTypes'

export default async function StudentReportPage({ params }: { params: { id: number } }) {
  const { result: student, statusCode } = await getStudentById(params.id)

  if (statusCode !== 200) {
    return <DataError />
  }

  return <ReportInput studentData={student as StudentType} />
}
