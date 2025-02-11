// Next Imports
import { redirect } from 'next/navigation'

// Components
import Roles from '@/views/roles'
import DataError from '@/components/other/DataError'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchTeachersWithRoles } from '@/libs/actions/teachers'
import { fetchRoles } from '@/libs/actions/roles'

// Types
import type { Session } from '@/types/auth'
import type { TeacherWithRolesType } from '@/types/roleTypes'

const RolesApp = async () => {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  // Fetch data in parallel
  const [{ result: teachers }, { result: roles }] = await Promise.all([fetchTeachersWithRoles(), fetchRoles()])

  if (!teachers) {
    return <DataError />
  }

  const mappedTeachersWithRoles: TeacherWithRolesType[] = teachers.map((teacher: any) => ({
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    avatar: teacher.avatar,
    role: teacher.teachersToRoles.map((item: any) => ({
      id: item.roles.id,
      name: item.roles.name
    }))
  }))

  return <Roles userData={mappedTeachersWithRoles} roles={roles} />
}

export default RolesApp
