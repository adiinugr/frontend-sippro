// Component Imports
import UserStudentList from '@/views/user/student/list'

// Data Imports
import { studentList } from '@/data/dummy/studentList'

/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */

const UserStudentListPage = () => {
  // Vars
  const data = studentList

  return <UserStudentList userStudentData={data} />
}

export default UserStudentListPage
