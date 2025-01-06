// Component Imports
import RoleList from '@/views/role/list'

// Data
import { fetchRoles } from '@/libs/actions/roles'

const StudyYearPage = async () => {
  const roleData = await fetchRoles()

  return <RoleList roleData={roleData.result} />
}

export default StudyYearPage
