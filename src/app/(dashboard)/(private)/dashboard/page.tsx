import React from 'react'

import { redirect } from 'next/navigation'

import { getStudentById } from '@/libs/actions/students'
import { auth } from '@/libs/auth'
import StudentProfile from '@/views/user/student/profile'
import TeacherDashboard from '@/views/dashboard/teacher'

export default async function DashboardPage() {
  const session = await auth()

  const data = await getStudentById(Number(session?.user?.id))

  if (data.statusCode === 404 || !session) {
    redirect('/not-found')
  }

  return session.user.status === 'student' ? <StudentProfile data={data} /> : <TeacherDashboard />
}
