// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

// Libs
import { auth } from '@/libs/auth'

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await auth()

  return <>{session ? children : <AuthRedirect />}</>
}
