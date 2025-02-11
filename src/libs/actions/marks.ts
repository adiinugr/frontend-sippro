'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface Mark {
  studentId: number
  subjectId: number
  subjectGroupId: number
  semester: string
  mark: number
}

// Constants
const MARKS_PATH = '/mark'
const REVALIDATE_PATH = '/'

// Actions
export async function fetchMarks(): Promise<ApiResponse<Mark[]>> {
  return apiClient<Mark[]>(MARKS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createMark(data: Mark): Promise<ApiResponse<Mark>> {
  return apiClient<Mark>(
    MARKS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function updateMark(id: number, data: { name: string }): Promise<ApiResponse<Mark>> {
  return apiClient<Mark>(
    `${MARKS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteMarkById(studentId: number, subjectGroupId: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${MARKS_PATH}/${studentId}/${subjectGroupId}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
