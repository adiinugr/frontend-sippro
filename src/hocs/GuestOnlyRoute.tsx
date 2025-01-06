// Next Imports
import { redirect } from 'next/navigation'

// Type Imports
import type { ChildrenType } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Libs
import { auth } from '@/libs/auth'

const GuestOnlyRoute = async ({ children }: ChildrenType) => {
  const session = await auth()

  if (session) {
    redirect(themeConfig.homePageUrl)
  }

  return <>{children}</>
}

export default GuestOnlyRoute
