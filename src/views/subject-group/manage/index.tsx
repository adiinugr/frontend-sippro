import { Grid } from '@mui/material'

import SubjectGroupSetting from '@/views/subject-group/manage/SubjectGroupSetting'

interface Props {
  selectedSubjectGroup: {
    id: number
    name: string
    grade: {
      name: string
    }
    lessonYear: {
      name: string
    }
    subjectsToSubjectGroups: {
      subject: {
        code: string
        name: string
      }
    }[]
    subjectGroupsToClassroomsToStudents: {
      classroom: {
        id: any
        name: string
      }
      student: {
        name: string
      }
    }[]
  }
}

const SubjectGroupManage = ({ selectedSubjectGroup }: Props) => {
  const classroomData = selectedSubjectGroup.subjectGroupsToClassroomsToStudents

  const subjectGroup = {
    id: selectedSubjectGroup.id,
    name: selectedSubjectGroup.name
  }

  const groupedDataByClassroom = Object.entries(
    classroomData.reduce((acc: any, { classroom, student }) => {
      if (!acc[classroom.name]) {
        acc[classroom.name] = []
      }

      acc[classroom.name].push({ classroom, student })

      return acc
    }, {})
  ).map(([classroom, data]) => ({ classroom, data }))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupSetting classroomData={groupedDataByClassroom as any} subjectGroup={subjectGroup} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupManage
