// MUI Imports
import { Grid } from '@mui/material'

// Components Import
import SubjectGroupSetting from '@/views/subject-group/manage/SubjectGroupSetting'
import type { SubjectGroupType } from '@/types/subjectGroupTypes'

const SubjectGroupManage = ({ selectedSubjectGroup }: { selectedSubjectGroup: SubjectGroupType }) => {
  const subjectGroup = {
    id: selectedSubjectGroup.id,
    name: selectedSubjectGroup.name
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubjectGroupSetting
          classroomData={selectedSubjectGroup.clsrmsToSbjgs as SubjectGroupType['clsrmsToSbjgs']}
          subjectGroup={subjectGroup}
        />
      </Grid>
    </Grid>
  )
}

export default SubjectGroupManage
