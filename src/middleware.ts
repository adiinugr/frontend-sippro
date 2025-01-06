import { NextResponse } from 'next/server'

import { auth } from '@/libs/auth'

export default auth(req => {
  const user = req.auth?.user

  const adminRoutes = [
    '/teacher/campus',
    '/teacher/setting/classroom',
    '/teacher/setting/grade',
    '/teacher/setting/study-year',
    '/teacher/setting/subject',
    '/teacher/setting/subject-group/add',
    '/teacher/setting/subject-group/edit/[id]',
    '/teacher/setting/subject-group/list',
    '/teacher/setting/subject-group/manage/[id]',
    '/teacher/user/student/add',
    '/teacher/user/student/chat-ai/[id]',
    '/teacher/user/student/edit/[id]',
    '/teacher/user/student/list',
    '/teacher/user/student/profile/[id]',
    '/teacher/user/student/report/[id]'
  ]

  const superAdminRoutes = [
    '/teacher/role',
    '/teacher/user/teacher',
    '/teacher/user/teacher/add',
    '/teacher/user/teacher/edit/[id]',
    '/teacher/user/teacher/list'
  ]

  if (adminRoutes.includes(req.nextUrl.pathname) && !user?.roles?.includes('Admin', 'Super Admin')) {
    return NextResponse.redirect(new URL('/pages/401-not-authorized', req.url))
  }

  if (superAdminRoutes.includes(req.nextUrl.pathname) && !user?.roles?.includes('Super Admin')) {
    return NextResponse.redirect(new URL('/pages/401-not-authorized', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*']
}
