'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface Subject {
  id: number
  name: string
  code: string
}

interface CreateSubjectDto {
  name: string
}

interface UpdateSubjectDto {
  name: string
  code: string
}

// Constants
const SUBJECTS_PATH = '/subject'
const REVALIDATE_PATH = '/setting/subject'

// Actions
export async function fetchSubjects(): Promise<ApiResponse<Subject[]>> {
  return apiClient<Subject[]>(SUBJECTS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createSubject(data: CreateSubjectDto): Promise<ApiResponse<Subject>> {
  return apiClient<Subject>(
    SUBJECTS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getSubjectById(id: number): Promise<ApiResponse<Subject>> {
  return apiClient<Subject>(`${SUBJECTS_PATH}/${id}`, {
    method: 'GET'
  })
}

export async function updateSubject(id: number, data: UpdateSubjectDto): Promise<ApiResponse<Subject>> {
  return apiClient<Subject>(
    `${SUBJECTS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteSubjectById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${SUBJECTS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
