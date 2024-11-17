// Component Imports
import SubjectList from '@/views/subject/list'

// Data Imports
import { subjectList } from '@/data/dummy/subjectList'

/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */

const SubjectListPage = () => {
  // Vars
  const data = subjectList

  return <SubjectList subjectData={data} />
}

export default SubjectListPage
