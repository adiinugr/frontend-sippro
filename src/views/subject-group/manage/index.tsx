// MUI Imports
import { Grid } from '@mui/material'

// Components Import
import SubjectGroupSetting from '@/views/subject-group/manage/SubjectGroupSetting'

interface Props {
  selectedSubjectGroup: {
    id: number
    name: string
    grade: {
      id: number
      name: string
    }
    lessonYear: {
      id: number
      name: string
    }
    sbjsToSbjgs: {
      subject: {
        id: number
        code: string
        name: string
      }
      subjectOrder: number
    }[]
    clsrmsToSbjgs: {
      id: number
      classroom: {
        id: number
        name: string
        gradeId: number
      }
      stdsToSbjgsToClsrms: {
        student: {
          id: number
          name: string
          nis: string
          nisn: string
        }
      }[]
    }[]
  }
}

const SubjectGroupManage = ({ selectedSubjectGroup }: Props) => {
  const subjectGroup = {
    id: selectedSubjectGroup.id,
    name: selectedSubjectGroup.name
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupSetting classroomData={selectedSubjectGroup.clsrmsToSbjgs} subjectGroup={subjectGroup} />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupManage
