// Component Imports
import UserStudentList from '@/views/user/student/list'

// Data Imports

import { fetchStudents } from '@/libs/actions/students'

const UserStudentListPage = async () => {
  const studentData = await fetchStudents()

  if (!studentData.result) {
    return <p>Tidak ada data!</p>
  }

  return <UserStudentList userStudentData={studentData.result} />
}

export default UserStudentListPage
