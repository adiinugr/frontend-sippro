import 'next-auth/jwt'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  type JWT = {
    id: number
    email: string
    name: string
    status: string
    accessToken: string
    roles?: any
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      name: string
      status: string
      accessToken: string
      roles?: any
    } & DefaultSession['user']
  }

  interface User {
    id: number
    email: string
    name: string
    status: string
    accessToken: string
    roles?: any
  }
}
