// MUI Imports
import Grid from '@mui/material/Grid'

import { fetchSubjectGroups } from '@/libs/actions/subjectGroups'

// Component Imports
import SubjectGroupList from '@views/subject-group/list'

const SubjectGroupListPage = async () => {
  const subjectGroupRes = await fetchSubjectGroups()

  const mappedSubjectGroup = subjectGroupRes.result.map(
    (subjectGroup: {
      id: number
      name: string
      lessonYear: { name: string }
      grade: { name: string }
      subjectsToSubjectGroups: {
        subject: {
          id: number
          code: string
          name: string
        }
      }[]
    }) => {
      return {
        id: subjectGroup.id,
        name: subjectGroup.name,
        studyYear: subjectGroup.lessonYear.name,
        grade: subjectGroup.grade.name,
        subjects: subjectGroup.subjectsToSubjectGroups
      }
    }
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubjectGroupList subjectGroupData={mappedSubjectGroup} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupListPage
