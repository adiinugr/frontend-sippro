// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import UserStudentAdd from '@/views/user/student/add'

export default async function StudentAddPage() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentAdd />
      </Grid>
    </Grid>
  )
}
