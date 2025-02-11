'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
export interface Permission {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  rolesToPermissions: {
    roles: {
      name: string
    }
  }[]
}

export interface CreatePermissionDto {
  name: string
}

// Constants
const PERMISSIONS_PATH = '/permission'
const REVALIDATE_PATH = '/teacher/permissions'

// Actions
export async function fetchPermissions(): Promise<ApiResponse<Permission[]>> {
  return apiClient<Permission[]>(PERMISSIONS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createPermission(data: CreatePermissionDto): Promise<ApiResponse<Permission>> {
  return apiClient<Permission>(
    PERMISSIONS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getPermissionById(id: number): Promise<ApiResponse<Permission>> {
  return apiClient<Permission>(`${PERMISSIONS_PATH}/${id}`, {
    method: 'GET'
  })
}

export async function updatePermission(id: number, data: CreatePermissionDto): Promise<ApiResponse<Permission>> {
  return apiClient<Permission>(
    `${PERMISSIONS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deletePermissionById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${PERMISSIONS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
