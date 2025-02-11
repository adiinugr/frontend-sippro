// Components
import { Grid } from '@mui/material'

import ViolationList from '@/views/violation/list'
import DataError from '@/components/other/DataError'

// Data
import { fetchViolations } from '@/libs/actions/violations'

// Components
import StudentTardiness from '@/components/card-statistics/StudentTardness'
import ViolationLevel from '@/components/card-statistics/ViolationLevel'

const ViolationListPage = async () => {
  const violationsData = await fetchViolations()

  if (!violationsData.result) {
    return <DataError />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <ViolationLevel violationsData={violationsData.result} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StudentTardiness violationsData={violationsData.result} />
      </Grid>
      <Grid item xs={12}>
        <ViolationList violationsData={violationsData.result} />
      </Grid>
    </Grid>
  )
}

export default ViolationListPage
