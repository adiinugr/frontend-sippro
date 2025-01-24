// Component Imports

import UserTeacherList from '@/views/user/teacher/list'

// Data Imports
import { fetchTeachers } from '@/libs/actions/teachers'

const UserTeacherListPage = async () => {
  const teacherData = await fetchTeachers()

  if (!teacherData.result) {
    return <p>Tidak ada data!</p>
  }

  return <UserTeacherList userTeacherData={teacherData.result} />
}

export default UserTeacherListPage
