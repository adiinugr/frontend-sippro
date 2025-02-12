'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
export interface LessonYear {
  id: number
  name: string
}

export interface CreateLessonYearDto {
  name: string
}

// Constants
const LESSON_YEARS_PATH = '/lesson-year'
const REVALIDATE_PATH = '/setting/study-year'

// Actions
export async function fetchLessonYears(): Promise<ApiResponse<LessonYear[]>> {
  return apiClient<LessonYear[]>(LESSON_YEARS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createLessonYear(data: CreateLessonYearDto): Promise<ApiResponse<any>> {
  return apiClient<LessonYear>(
    LESSON_YEARS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getLessonYearById(id: number): Promise<ApiResponse<LessonYear>> {
  return apiClient<LessonYear>(`${LESSON_YEARS_PATH}/${id}`, {
    method: 'GET'
  })
}

export async function updateLessonYear(id: number, data: CreateLessonYearDto): Promise<ApiResponse<any>> {
  return apiClient<LessonYear>(
    `${LESSON_YEARS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteLessonYearById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${LESSON_YEARS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
