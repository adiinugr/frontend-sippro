'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Constants
const CLASSROOMS_TO_SUBJECT_GROUP_PATH = '/classrooms-to-subject-group'
const REVALIDATE_PATH = '/setting/subject-group/list'

// Types
interface ClassroomToSubjectGroup {
  classroomId: number
  subjectGroupId: number
}

// Actions
export async function createClasroomsToSubjectGroup(
  data: ClassroomToSubjectGroup
): Promise<ApiResponse<ClassroomToSubjectGroup>> {
  return apiClient<ClassroomToSubjectGroup>(
    CLASSROOMS_TO_SUBJECT_GROUP_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getClasroomsToSubjectGroup(
  data: ClassroomToSubjectGroup
): Promise<ApiResponse<ClassroomToSubjectGroup>> {
  return apiClient<ClassroomToSubjectGroup>(
    `${CLASSROOMS_TO_SUBJECT_GROUP_PATH}/${data.classroomId}/${data.subjectGroupId}`,
    {
      method: 'GET',
      cache: 'no-cache'
    }
  )
}

export async function deleteClassroomsToSubjectGroupById(subjectGroupId: number): Promise<ApiResponse<void>> {
  return apiClient(`${CLASSROOMS_TO_SUBJECT_GROUP_PATH}/${subjectGroupId}`, {
    method: 'DELETE'
  })
}

export async function deleteClassroomsToSubjectGroupByClassroomsId(
  classroomId: number,
  subjectGroupId: number
): Promise<ApiResponse<void>> {
  return apiClient(`${CLASSROOMS_TO_SUBJECT_GROUP_PATH}/delete-by-classroom-id/${classroomId}/${subjectGroupId}`, {
    method: 'DELETE'
  })
}
