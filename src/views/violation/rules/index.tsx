// MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'

// Type Imports
import type { RuleType } from '@/types/ruleTypes'

// Component Imports
import ViolationRulesTable from './ViolationRulesTable'

const ViolationRules = async ({ violationRulesData }: { violationRulesData?: RuleType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Alert severity='warning' className='text-orange-800 bg-orange-50'>
            Perhatian! Bahwasanya sebelum menambah data <span className='font-bold'>Peraturan</span>, harus ditambahkan
            data <span className='font-bold'>Kategori</span> terlebih dahulu.
          </Alert>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ViolationRulesTable tableData={violationRulesData} />
      </Grid>
    </Grid>
  )
}

export default ViolationRules
