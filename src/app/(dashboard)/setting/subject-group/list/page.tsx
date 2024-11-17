// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubjectGroupList from '@views/subject-group/list'

// Data Imports
import { subjectGroupData } from '@/data/dummy/subjectGroupList'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */

const SubjectGroupListPage = () => {
  // Vars
  const data = subjectGroupData

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubjectGroupList subjectGroupData={data} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupListPage
