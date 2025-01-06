// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { TeacherType } from '@/types/usersTypes'

// Component Imports
import UserTeacherListTable from './UserTeacherListTable'

const UserTeacherList = ({ userTeacherData }: { userTeacherData?: TeacherType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTeacherListTable tableData={userTeacherData} />
      </Grid>
    </Grid>
  )
}

export default UserTeacherList
