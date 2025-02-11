'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface RolePermission {
  roleId: number
  permissionId: number
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

// Constants
const ROLES_TO_PERMISSIONS_PATH = '/roles-to-permissions'
const REVALIDATE_PATH = '/teachers/roles'

// Actions
export async function createRolesToPermissions(data: RolePermission): Promise<ApiResponse<RolePermission>> {
  return apiClient<RolePermission>(
    ROLES_TO_PERMISSIONS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getRolePermissions(roleId: number): Promise<ApiResponse<RolePermission[]>> {
  return apiClient<RolePermission[]>(`${ROLES_TO_PERMISSIONS_PATH}/${roleId}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function deleteRolePermissions(roleId: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${ROLES_TO_PERMISSIONS_PATH}/${roleId}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
