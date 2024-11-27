// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { StudentType } from '@/types/usersTypes'

// Component Imports
import UserStudentListTable from './UserStudentListTable'
import UserStudentListCards from './UserStudentListCards'

const UserStudentList = ({ userStudentData }: { userStudentData?: StudentType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentListCards />
      </Grid>
      <Grid item xs={12}>
        <UserStudentListTable tableData={userStudentData} />
      </Grid>
    </Grid>
  )
}

export default UserStudentList
