// Component Imports
import SubjectList from '@/views/subject/list'

// Data Imports

import { fetchSubjects } from '@/libs/actions/subjects'

const SubjectListPage = async () => {
  // Vars
  const subjectData = await fetchSubjects()

  return <SubjectList subjectData={subjectData.result} />
}

export default SubjectListPage
