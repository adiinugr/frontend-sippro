'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface SubjectsToSubjectGroup {
  subjectOrder: number
  subjectId: number
  subjectGroupId: number
}

interface UpdateSubjectsToSubjectGroup {
  code: string
  name: string
}

// Constants
const SUBJECTS_TO_SUBJECT_GROUP_PATH = '/subjects-to-subject-group'
const REVALIDATE_PATH = '/setting/subject-group/list'

// Actions
async function createSubjectsToSubjectGroup(
  data: SubjectsToSubjectGroup
): Promise<ApiResponse<SubjectsToSubjectGroup>> {
  return apiClient<SubjectsToSubjectGroup>(
    SUBJECTS_TO_SUBJECT_GROUP_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function updateSubjectsToSubjectGroup(
  id: number,
  data: UpdateSubjectsToSubjectGroup
): Promise<ApiResponse<SubjectsToSubjectGroup>> {
  return apiClient<SubjectsToSubjectGroup>(
    `${SUBJECTS_TO_SUBJECT_GROUP_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function deleteSubjectsToSubjectGroupById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${SUBJECTS_TO_SUBJECT_GROUP_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}

export { createSubjectsToSubjectGroup, updateSubjectsToSubjectGroup, deleteSubjectsToSubjectGroupById }
