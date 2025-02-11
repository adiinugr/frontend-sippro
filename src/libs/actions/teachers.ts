'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
export interface Teacher {
  id: number
  email: string
  name: string
  placeOfBirth: string
  dateOfBirth: string
  createdAt: string
  updatedAt: string
}

export interface TeacherWithRoles extends Teacher {
  teachersToRoles: {
    roles: {
      name: string
    }
  }[]
}

export interface CreateTeacherDto {
  email: string
  name: string
  placeOfBirth: string
  dateOfBirth: string
  password: string
}

export type UpdateTeacherDto = Omit<CreateTeacherDto, 'password'>

// Constants
const TEACHERS_PATH = '/teacher'
const REVALIDATE_PATH = '/user/teacher'

// Actions
export async function fetchTeachers(): Promise<ApiResponse<Teacher[]>> {
  return apiClient<Teacher[]>(TEACHERS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function fetchTeachersWithRoles(): Promise<ApiResponse<TeacherWithRoles[]>> {
  return apiClient<TeacherWithRoles[]>(`${TEACHERS_PATH}/with-roles`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function getTeacherById(id: number): Promise<ApiResponse<Teacher>> {
  return apiClient<Teacher>(`${TEACHERS_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createTeacher(data: CreateTeacherDto): Promise<ApiResponse<Teacher>> {
  return apiClient<Teacher>(
    TEACHERS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function updateTeacher(id: number, data: UpdateTeacherDto): Promise<ApiResponse<Teacher>> {
  return apiClient<Teacher>(
    `${TEACHERS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteTeacher(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${TEACHERS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
