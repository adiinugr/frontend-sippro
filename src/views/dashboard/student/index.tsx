import StudentProfile from '@/views/user/student/profile'

type Props = {
  data: any
}

export default function StudentDashboard({ data }: Props) {
  return <StudentProfile data={data} />
}
