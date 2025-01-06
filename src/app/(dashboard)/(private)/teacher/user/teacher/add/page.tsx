// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import UserTeacherAdd from '@/views/user/teacher/add'

const TeacherAddPage = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTeacherAdd />
      </Grid>
    </Grid>
  )
}

export default TeacherAddPage
