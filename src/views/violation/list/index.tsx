// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { ViolationType } from '@/types/violationTypes'

// Components
import ViolationListTable from './ViolationListTable'

// Component Imports

const ViolationList = ({ violationsData }: { violationsData?: ViolationType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ViolationListTable tableData={violationsData} />
      </Grid>
    </Grid>
  )
}

export default ViolationList
