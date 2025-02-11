export type PermissionRowType = {
  id: number
  name: string
  createdDate: string
  roles: string[]
}

export interface RoleToPermission {
  roles: {
    name: string
  }
}

export interface Permission {
  id: number
  name: string
  createdAt: string
  rolesToPermissions: RoleToPermission[]
}
