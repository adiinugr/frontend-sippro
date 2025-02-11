// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components
import SubjectGroupList from '@views/subject-group/list'

// Libs & Actions
import { auth } from '@/libs/auth'
import { fetchSubjectGroups } from '@/libs/actions/subjectGroups'

// Types
import type { Session } from '@/types/auth'

interface SubjectGroup {
  id: number
  name: string
  lessonYear: { id: number; name: string }
  grade: { id: number; name: string }
  sbjsToSbjgs: any
  clsrmsToSbjgs: any
}

export default async function SubjectGroupListPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  const { result: subjectGroups } = await fetchSubjectGroups()

  const mappedSubjectGroups = subjectGroups?.map(
    ({ id, name, lessonYear, grade, sbjsToSbjgs, clsrmsToSbjgs }: SubjectGroup) => ({
      id,
      name,
      lessonYear: lessonYear.name,
      grade: grade.name,
      sbjsToSbjgs,
      clsrmsToSbjgs
    })
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubjectGroupList subjectGroupData={mappedSubjectGroups} />
      </Grid>
    </Grid>
  )
}
