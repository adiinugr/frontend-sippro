// Component Imports
import GradeList from '@/views/grade/list'

// Data
import { fetchGrades } from '@/libs/actions/grades'

const StudyYearPage = async () => {
  const gradeData = await fetchGrades()

  return <GradeList gradeData={gradeData.result} />
}

export default StudyYearPage
