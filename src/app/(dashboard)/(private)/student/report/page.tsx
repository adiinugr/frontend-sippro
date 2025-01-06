import { redirect } from 'next/navigation'

// Components
import ReportInput from '@/views/user/student/report'

// Libs
import { auth } from '@/libs/auth'
import { getStudentById } from '@/libs/actions/students'

export default async function StudentReportPage() {
  const session = await auth()

  const data = await getStudentById(Number(session?.user?.id))

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  return data ? <ReportInput studentData={data.result} /> : null
}
