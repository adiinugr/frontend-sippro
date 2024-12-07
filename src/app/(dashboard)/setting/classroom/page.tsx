// Component Imports
import ClassroomList from '@/views/classroom/list'

// Data
import { fetchClassrooms } from '@/libs/actions/classrooms'

const ClassroomPage = async () => {
  const classroomData = await fetchClassrooms()

  return <ClassroomList classroomData={classroomData.result} />
}

export default ClassroomPage
