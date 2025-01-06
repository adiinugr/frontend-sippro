import { redirect } from 'next/navigation'

import { getStudentById } from '@/libs/actions/students'
import ReportInput from '@/views/user/student/report'

export default async function StudentReportPage({ params }: { params: { id: number } }) {
  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <ReportInput studentData={data.result} /> : null
}
