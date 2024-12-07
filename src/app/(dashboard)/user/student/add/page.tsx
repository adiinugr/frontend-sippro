// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import UserStudentAdd from '@/views/user/student/add'

const StudentAddPage = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentAdd />
      </Grid>
    </Grid>
  )
}

export default StudentAddPage
