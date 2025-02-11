// MUI Imports
import Grid from '@mui/material/Grid'

// Data Imports
import { getSubjectGroupById } from '@/libs/actions/subjectGroups'

// Components
import SubjectGroupManage from '@/views/subject-group/manage'
import DataError from '@/components/other/DataError'
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

export default async function ManagePage({ params }: { params: { id: number } }) {
  const { statusCode, result } = await getSubjectGroupById(params.id)

  if (statusCode !== 200 || !result) {
    return <DataError />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupManage selectedSubjectGroup={result as SubjectGroupType} />
      </Grid>
    </Grid>
  )
}
