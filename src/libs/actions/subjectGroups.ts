'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

// Types
interface SubjectGroup {
  id: number
  name: string
  gradeId: number
  lessonYearId: number
  grade: { id: number; name: string }
  lessonYear: { id: number; name: string }
  sbjsToSbjgs: any
  clsrmsToSbjgs: any
}

interface CreateSubjectGroupDto {
  name: string
  gradeId: number | string
  lessonYearId: number | string
}

// Constants
const SUBJECT_GROUPS_PATH = '/subject-group'
const REVALIDATE_PATH = '/setting/subject-group/list'

// Actions
export async function fetchSubjectGroups(): Promise<ApiResponse<SubjectGroupType[]>> {
  return apiClient<SubjectGroupType[]>(SUBJECT_GROUPS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createSubjectGroup(data: CreateSubjectGroupDto): Promise<ApiResponse<SubjectGroup>> {
  return apiClient<SubjectGroup>(
    SUBJECT_GROUPS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getSubjectGroupById(id: number): Promise<ApiResponse<SubjectGroupType>> {
  return apiClient<SubjectGroupType>(`${SUBJECT_GROUPS_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function updateSubjectGroupById(
  id: number,
  data: CreateSubjectGroupDto
): Promise<ApiResponse<SubjectGroup>> {
  return apiClient<SubjectGroup>(
    `${SUBJECT_GROUPS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteSubjectGroupById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${SUBJECT_GROUPS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
