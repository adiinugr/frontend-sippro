'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface StudentSubjectGroupClassroom {
  classroomsToSubjectGroupId: number
  studentId: number
  classroomId: number
}

interface DeleteStudentSubjectGroupClassroom {
  classroomsToSubjectGroupId: number
  studentId: number
}

// Constants
const STUDENTS_SUBJECT_GROUPS_CLASSROOMS_PATH = '/students-to-subject-groups-to-classroom'
const REVALIDATE_PATH = '/setting/subject-group/manage'

// Actions
async function createStudentsSubjectGroupsToClassrooms(
  data: StudentSubjectGroupClassroom
): Promise<ApiResponse<StudentSubjectGroupClassroom>> {
  return apiClient<StudentSubjectGroupClassroom>(
    STUDENTS_SUBJECT_GROUPS_CLASSROOMS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    `${REVALIDATE_PATH}/${data.studentId}`
  )
}

async function deleteStudentsSubjectGroupsToClassrooms(
  data: DeleteStudentSubjectGroupClassroom
): Promise<ApiResponse<void>> {
  return apiClient(
    STUDENTS_SUBJECT_GROUPS_CLASSROOMS_PATH,
    {
      method: 'DELETE',
      body: JSON.stringify(data)
    },
    `${REVALIDATE_PATH}/${data.studentId}`
  )
}

export { createStudentsSubjectGroupsToClassrooms, deleteStudentsSubjectGroupsToClassrooms }
