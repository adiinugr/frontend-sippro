// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { RuleCategoryType } from '@/types/ruleTypes'

// Component Imports
import RuleCategoryListTable from './RuleCategoryListTable'

const ViolationCategoryList = async ({ ruleCategoryData }: { ruleCategoryData?: RuleCategoryType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RuleCategoryListTable tableData={ruleCategoryData} />
      </Grid>
    </Grid>
  )
}

export default ViolationCategoryList
