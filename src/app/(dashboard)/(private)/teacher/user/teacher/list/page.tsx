// Component Imports
import UserTeacherList from '@/views/user/teacher/list'
import DataError from '@/components/other/DataError'

// Data Imports
import { fetchTeachers } from '@/libs/actions/teachers'

const UserTeacherListPage = async () => {
  const teacherData = await fetchTeachers()

  if (!teacherData.result) {
    return <DataError />
  }

  return <UserTeacherList userTeacherData={teacherData.result} />
}

export default UserTeacherListPage
