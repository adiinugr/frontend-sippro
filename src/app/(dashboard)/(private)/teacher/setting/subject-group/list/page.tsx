// MUI Imports
import Grid from '@mui/material/Grid'

import { fetchSubjectGroups } from '@/libs/actions/subjectGroups'

// Component Imports
import SubjectGroupList from '@views/subject-group/list'

const SubjectGroupListPage = async () => {
  const subjectGroupRes = await fetchSubjectGroups()

  const mappedSubjectGroupRes = subjectGroupRes.result.map(
    (subjectGroup: {
      id: number
      name: string
      lessonYear: { name: string }
      grade: { name: string }
      sbjsToSbjgs: any
      clsrmsToSbjgs: any
    }) => {
      return {
        id: subjectGroup.id,
        name: subjectGroup.name,
        lessonYear: subjectGroup.lessonYear.name,
        grade: subjectGroup.grade.name,
        sbjsToSbjgs: subjectGroup.sbjsToSbjgs,
        clsrmsToSbjgs: subjectGroup.clsrmsToSbjgs
      }
    }
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubjectGroupList subjectGroupData={mappedSubjectGroupRes} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupListPage
