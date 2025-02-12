'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'
import type { ClassroomType } from '@/types/classroomTypes'

// Constants
const CLASSROOMS_PATH = '/classroom'
const REVALIDATE_PATH = '/setting/classroom'

// Actions
export async function fetchClassrooms(): Promise<ApiResponse<ClassroomType[]>> {
  return apiClient<ClassroomType[]>(CLASSROOMS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createClassroom(data: { name: string }): Promise<ApiResponse<any>> {
  return apiClient<ClassroomType>(
    CLASSROOMS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getClassroomById(id: number): Promise<ApiResponse<ClassroomType>> {
  return apiClient<ClassroomType>(`${CLASSROOMS_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function updateClassroom(id: number, data: { name: string }): Promise<ApiResponse<any>> {
  return apiClient<ClassroomType>(
    `${CLASSROOMS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteClassroomById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${CLASSROOMS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
