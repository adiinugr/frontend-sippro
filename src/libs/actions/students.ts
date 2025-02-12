'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'
import type { StudentType } from '@/types/usersTypes'

export interface CreateStudentDto {
  email: string
  name: string
  nis: string
  nisn: string
  placeOfBirth: string
  dateOfBirth: string
  password: string
}

export type UpdateStudentDto = Omit<CreateStudentDto, 'password'>

// Constants
const STUDENTS_PATH = '/student'
const REVALIDATE_PATH = '/user/student'

// Actions
export async function fetchStudents(): Promise<ApiResponse<StudentType[]>> {
  return apiClient<StudentType[]>(STUDENTS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function getStudentById(id: number): Promise<ApiResponse<StudentType>> {
  return apiClient<StudentType>(`${STUDENTS_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createStudent(data: CreateStudentDto): Promise<ApiResponse<any>> {
  return apiClient<StudentType>(
    STUDENTS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function updateStudentById(id: number, data: UpdateStudentDto): Promise<ApiResponse<any>> {
  return apiClient<StudentType>(
    `${STUDENTS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteStudentById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${STUDENTS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
