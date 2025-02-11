// Type Imports

export type RoleType = {
  id: string | number
  name: string
  teachersToRoles?: {
    teachers: {
      id: string | number
      name: string
      avatar?: string
    }
  }[]
}

export type TeacherWithRolesType = {
  avatar: string
  id: string
  name: string
  email: string
  role: { id: string; name: string }[]
}
