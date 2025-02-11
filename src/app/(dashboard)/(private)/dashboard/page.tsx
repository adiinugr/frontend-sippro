import React from 'react'

// Next Imports
import { redirect } from 'next/navigation'

// Libs & Actions
import { getStudentById } from '@/libs/actions/students'
import { auth } from '@/libs/auth'

// Components
import StudentProfile from '@/views/user/student/profile'
import TeacherDashboard from '@/views/dashboard/teacher'

// Types
type UserStatus = 'student' | 'teacher'

interface User {
  id: string
  status: UserStatus
}

interface Session {
  user: User
}

export default async function DashboardPage() {
  // Get auth session
  const session = (await auth()) as Session | null

  if (!session) {
    redirect('/login')
  }

  // Get student data if user is a student
  const studentData = session.user.status === 'student' ? await getStudentById(Number(session.user.id)) : null

  return session.user.status === 'student' ? <StudentProfile data={studentData} /> : <TeacherDashboard />
}
