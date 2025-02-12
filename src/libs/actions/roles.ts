'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
export interface Role {
  id: number
  name: string
  rolesToPermissions: any
  createdAt: string
  updatedAt: string
}

export interface CreateRoleDto {
  name: string
}

// Constants
const ROLES_PATH = '/role'
const REVALIDATE_PATH = '/teachers/roles'

// Actions
async function fetchRoles(): Promise<ApiResponse<Role[]>> {
  return apiClient<Role[]>(ROLES_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

async function createRole(data: CreateRoleDto): Promise<ApiResponse<Role>> {
  return apiClient<Role>(
    ROLES_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function getRoleById(id: number): Promise<ApiResponse<Role>> {
  return apiClient<Role>(`${ROLES_PATH}/${id}`, {
    method: 'GET'
  })
}

async function updateRole(id: number, data: CreateRoleDto): Promise<ApiResponse<Role>> {
  return apiClient<Role>(
    `${ROLES_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function deleteRoleById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${ROLES_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}

export { fetchRoles, createRole, getRoleById, updateRole, deleteRoleById }
