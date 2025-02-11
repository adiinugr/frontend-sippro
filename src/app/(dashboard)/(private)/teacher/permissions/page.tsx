// Next Imports
import { redirect } from 'next/navigation'

// Components
import Permissions from '@/views/permissions'
import DataError from '@/components/other/DataError'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchPermissions } from '@/libs/actions/permissions'

// Types
import type { Session } from '@/types/auth'
import type { Permission, PermissionRowType } from '@/types/permissionTypes'

export default async function TeacherPermissionsPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result } = await fetchPermissions()

  if (!result) {
    return <DataError />
  }

  const mappedData: PermissionRowType[] = result.map(
    ({ id, name, createdAt: createdDate, rolesToPermissions }: Permission) => ({
      id,
      name,
      createdDate,
      roles: rolesToPermissions.map(({ roles: { name } }) => name)
    })
  )

  return <Permissions permissionsData={mappedData} />
}
