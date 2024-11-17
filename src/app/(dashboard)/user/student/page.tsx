// Component Imports
import UserStudentList from '@/views/user/student/list'

// Data Imports
import { userList } from '@/data/dummy/userList'

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
  const data = userList

  return <UserStudentList userData={data} />
}

export default UserStudentListPage
