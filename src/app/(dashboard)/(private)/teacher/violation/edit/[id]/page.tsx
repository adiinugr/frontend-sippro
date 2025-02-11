import { Grid } from '@mui/material'

// Components
import DataError from '@/components/other/DataError'
import ViolationEdit from '@/views/violation/edit/page'

// Actons
import { getViolationById } from '@/libs/actions/violations'

const ViolationEditPage = async ({ params }: { params: { id: number } }) => {
  // Vars
  const data = await getViolationById(params.id)

  if (!data.result) {
    return <DataError />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ViolationEdit selectedData={data.result} violationId={params.id} />
      </Grid>
    </Grid>
  )
}

export default ViolationEditPage
