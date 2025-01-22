// MUI
import { Grid } from '@mui/material'

// Types
import type { StudentType } from '@/types/usersTypes'

// Components
import AchievementListTable from '@/views/user/student/achievement/AchievementListTable'

type Props = {
  studentData: StudentType
}

export default function Achievement({ studentData }: Props) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AchievementListTable tableData={studentData.achievements} studentId={studentData.id} />
      </Grid>
    </Grid>
  )
}
