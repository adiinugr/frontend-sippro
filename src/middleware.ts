import { NextResponse } from 'next/server'

import { auth } from '@/libs/auth'
import { checkTeacherPermissions } from '@/utils/permissions'
import { PERMISSIONS, type PermissionName } from '@/utils/permissions/constants'

// Define route configurations with required permissions
type RouteConfig = {
  path: string
  permissions: {
    name: PermissionName
    actions: ('create' | 'read' | 'update' | 'delete')[]
  }[]
  matchType?: 'every' | 'some'
}

// Route configurations
const routePermissions: RouteConfig[] = [
  // Campus management
  {
    path: '/teacher/campus',
    permissions: [{ name: PERMISSIONS.CAMPUS_FEATURE, actions: ['read'] }]
  },

  // Classroom settings
  {
    path: '/teacher/setting/classroom',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read', 'update'] }]
  },

  // Grade settings
  {
    path: '/teacher/setting/grade',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read', 'update'] }]
  },

  // Study year settings
  {
    path: '/teacher/setting/study-year',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read', 'update'] }]
  },

  // Subject management
  {
    path: '/teacher/setting/subject',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read', 'update'] }]
  },

  // Subject group routes
  {
    path: '/teacher/setting/subject-group/add',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['create'] }]
  },
  {
    path: '/teacher/setting/subject-group/edit/[id]',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['update'] }]
  },
  {
    path: '/teacher/setting/subject-group/list',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read'] }]
  },
  {
    path: '/teacher/setting/subject-group/manage/[id]',
    permissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['update'] }]
  },

  // Student management
  {
    path: '/teacher/user/student/add',
    permissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['create'] }]
  },
  {
    path: '/teacher/user/student/edit/[id]',
    permissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['update'] }]
  },
  {
    path: '/teacher/user/student/list',
    permissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['read'] }]
  },
  {
    path: '/teacher/user/student/profile/[id]',
    permissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['read'] }]
  },
  {
    path: '/teacher/user/student/report/[id]',
    permissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['read'] }]
  },
  {
    path: '/teacher/user/student/chat-ai/[id]',
    permissions: [{ name: PERMISSIONS.CAMPUS_FEATURE, actions: ['read', 'create'] }]
  },

  // Teacher management (Super Admin only)
  {
    path: '/teacher/role',
    permissions: [{ name: PERMISSIONS.ROLES_PERMISSIONS, actions: ['read', 'create', 'update', 'delete'] }]
  },
  {
    path: '/teacher/permissions',
    permissions: [{ name: PERMISSIONS.ROLES_PERMISSIONS, actions: ['read', 'create', 'update', 'delete'] }]
  },
  {
    path: '/teacher/user/teacher',
    permissions: [{ name: PERMISSIONS.TEACHER_MANAGEMENT, actions: ['read'] }]
  },
  {
    path: '/teacher/user/teacher/add',
    permissions: [{ name: PERMISSIONS.TEACHER_MANAGEMENT, actions: ['create'] }]
  },
  {
    path: '/teacher/user/teacher/edit/[id]',
    permissions: [{ name: PERMISSIONS.TEACHER_MANAGEMENT, actions: ['update'] }]
  },
  {
    path: '/teacher/user/teacher/list',
    permissions: [{ name: PERMISSIONS.TEACHER_MANAGEMENT, actions: ['read'] }]
  }
]

// Helper function to check if a path matches a route config
const pathMatchesRoute = (path: string, routePath: string): boolean => {
  const routeParts = routePath.split('/')
  const pathParts = path.split('/')

  if (routeParts.length !== pathParts.length) return false

  return routeParts.every((part, index) => {
    // Handle dynamic route parameters
    if (part.startsWith('[') && part.endsWith(']')) return true

    return part === pathParts[index]
  })
}

// Helper function to check if user is Super Admin
const isSuperAdmin = (user: any): boolean => {
  return user?.teachersToRoles?.some((role: any) => role.roles.name === 'Super Admin')
}

// Enhanced middleware
export default auth(req => {
  const user = req.auth?.user
  const basePath = process.env.BASEPATH || ''

  // Get the full URL and pathname
  const url = new URL(req.url)
  const pathname = url.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If no user is logged in, redirect to login
  if (!user) {
    const loginUrl = new URL(`${basePath}/login`, req.url)

    return NextResponse.redirect(loginUrl)
  }

  // Get the path without the base path
  const currentPath = basePath ? pathname.replace(basePath, '') : pathname

  // Handle root path
  if (currentPath === '/') {
    // Redirect to dashboard based on user status
    if (user.status === 'teacher') {
      return NextResponse.redirect(new URL(`${basePath}/teacher/dashboard`, req.url))
    } else if (user.status === 'student') {
      return NextResponse.redirect(new URL(`${basePath}/student/dashboard`, req.url))
    }

    return NextResponse.next()
  }

  // Super Admin has access to all routes
  if (isSuperAdmin(user)) {
    return NextResponse.next()
  }

  // Find matching route configuration
  const matchingRoute = routePermissions.find(route => pathMatchesRoute(currentPath, route.path))

  // If route requires permissions
  if (matchingRoute) {
    const hasPermission = checkTeacherPermissions(user as any, matchingRoute.permissions, matchingRoute.matchType)

    if (!hasPermission) {
      const unauthorizedUrl = new URL(`${basePath}/pages/401-not-authorized`, req.url)

      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

    // Explicitly match root path
    '/'
  ]
}
