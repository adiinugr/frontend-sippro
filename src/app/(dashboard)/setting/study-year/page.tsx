// Component Imports

import StudyYearList from '@/views/study-year/list'

// Data Imports
import { studyYearList } from '@/data/dummy/studyYearList'

/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */

const StudyYearPage = () => {
  // Vars
  const data = studyYearList

  return <StudyYearList studyYearData={data} />
}

export default StudyYearPage
