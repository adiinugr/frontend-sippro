'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'
import type { GradeType } from '@/types/gradeTypes'

// Constants
const GRADES_PATH = '/grade'
const REVALIDATE_PATH = '/setting/grade'

// Actions
export async function fetchGrades(): Promise<ApiResponse<GradeType[]>> {
  return apiClient<GradeType[]>(GRADES_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createGrade(data: { name: string }): Promise<ApiResponse<any>> {
  return apiClient<GradeType>(
    GRADES_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getGradeById(id: number): Promise<ApiResponse<GradeType>> {
  return apiClient<GradeType>(`${GRADES_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function updateGrade(id: number, data: { name: string }): Promise<ApiResponse<any>> {
  return apiClient<GradeType>(
    `${GRADES_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteGradeById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${GRADES_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
