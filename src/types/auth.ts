export type UserStatus = 'student' | 'teacher'

export interface User {
  id: string
  status: UserStatus
}

export interface Session {
  user: User
}
