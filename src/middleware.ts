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

// Enhanced middleware
export default auth(req => {
  const user = req.auth?.user

  // If no user is logged in, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const currentPath = req.nextUrl.pathname

  // Special handling for Super Admin role
  if (user.status === 'teacher' && 'teachersToRoles' in user && Array.isArray(user.teachersToRoles)) {
    const isSuperAdmin = user.teachersToRoles.some(
      (role: { roles: { name: string } }) => role.roles.name === 'Super Admin'
    )

    if (isSuperAdmin) {
      // Super Admin has access to all routes
      return NextResponse.next()
    }
  }

  // Find matching route configuration
  const matchingRoute = routePermissions.find(route => pathMatchesRoute(currentPath, route.path))

  // If route requires permissions
  if (matchingRoute) {
    const hasPermission = checkTeacherPermissions(user as any, matchingRoute.permissions, matchingRoute.matchType)

    if (!hasPermission) {
      return NextResponse.redirect(new URL('/pages/401-not-authorized', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*']
}
