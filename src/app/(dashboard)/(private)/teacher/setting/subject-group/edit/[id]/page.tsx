// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getSubjectGroupById } from '@/libs/actions/subjectGroups'

// Components
import SubjectGroupEditList from '@/views/subject-group/edit'
import DataError from '@/components/other/DataError'

// Types
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

export default async function EditPage({ params }: { params: { id: number } }) {
  const { statusCode, result } = await getSubjectGroupById(params.id)

  if (statusCode !== 200) {
    return <DataError />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupEditList selectedData={result as SubjectGroupType} />
      </Grid>
    </Grid>
  )
}
