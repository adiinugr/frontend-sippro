'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface TeacherToRole {
  teacherId: number
  roleId: number
}

// Constants
const TEACHERS_TO_ROLES_PATH = '/teachers-to-roles'
const REVALIDATE_PATH = '/role'

// Actions
export async function createTeacherToRole(data: TeacherToRole): Promise<ApiResponse<TeacherToRole>> {
  return apiClient<TeacherToRole>(
    TEACHERS_TO_ROLES_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteTeacherToRole(teacherId: number, roleId: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${TEACHERS_TO_ROLES_PATH}/${teacherId}/${roleId}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
