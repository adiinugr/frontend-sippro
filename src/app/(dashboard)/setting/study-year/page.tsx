// Component Imports
import StudyYearList from '@/views/study-year/list'

// Data
import { fetchLessonYears } from '@/libs/actions/lessonYears'

const StudyYearPage = async () => {
  const lessonYearData = await fetchLessonYears()

  return <StudyYearList studyYearData={lessonYearData.result} />
}

export default StudyYearPage
