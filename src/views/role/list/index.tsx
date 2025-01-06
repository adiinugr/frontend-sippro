// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { RoleType } from '@/types/roleTypes'

// Component Imports
import RoleListTable from './RoleListTable'

const RoleList = async ({ roleData }: { roleData?: RoleType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RoleListTable tableData={roleData} />
      </Grid>
    </Grid>
  )
}

export default RoleList
