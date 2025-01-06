import { Grid } from '@mui/material'

import StudentLeft from '@/views/user/student/profile/student-left'

// Ccomponents
import StudentRight from '@/views/user/student/profile/student-right'

type Props = {
  data: any
}

export default function StudentProfile({ data }: Props) {
  const subjectGroup = data.result.stTSbgTc.map(
    (item: { clsrmsToSbjg: { subjectGroup: { lessonYear: { name: string } } } }) => {
      return item.clsrmsToSbjg.subjectGroup.lessonYear.name
    }
  )

  const getMarksBySemesterAndLessonYear = (semester: string, lessonYear: string) => {
    const marks = data.result.marks.filter(
      (mark: { subjectGroup: { lessonYear: { name: string } }; semester: string }) =>
        mark.subjectGroup.lessonYear.name === lessonYear && mark.semester === semester
    )

    return marks
  }

  const semester1Mark = getMarksBySemesterAndLessonYear('Semester 1', subjectGroup[0])
  const semester2Mark = getMarksBySemesterAndLessonYear('Semester 2', subjectGroup[0])
  const semester3Mark = getMarksBySemesterAndLessonYear('Semester 1', subjectGroup[1])
  const semester4Mark = getMarksBySemesterAndLessonYear('Semester 2', subjectGroup[1])
  const semester5Mark = getMarksBySemesterAndLessonYear('Semester 1', subjectGroup[2])
  const semester6Mark = getMarksBySemesterAndLessonYear('Semester 2', subjectGroup[2])

  const studentMarksBySemester = [
    {
      semester: 1,
      marks: semester1Mark
    },
    {
      semester: 2,
      marks: semester2Mark
    },
    {
      semester: 3,
      marks: semester3Mark
    },
    {
      semester: 4,
      marks: semester4Mark
    },
    {
      semester: 5,
      marks: semester5Mark
    },
    {
      semester: 6,
      marks: semester6Mark
    }
  ]

  const mappedSubject = data.result.marks.map(
    (mark: {
      subject: { code: string; name: string }
      mark: number
      subjectGroup: { lessonYear: { name: string } }
      semester: string
    }) => {
      return {
        subjectCode: mark.subject.code,
        subjectName: mark.subject.name,
        mark: mark.mark,
        lessonYear: mark.subjectGroup.lessonYear.name,
        semester: mark.semester
      }
    }
  )

  const sortedMappedSubject = mappedSubject.sort(
    (a: { subjectName: string; lessonYear: string }, b: { subjectName: any; lessonYear: any }) => {
      return a.subjectName.localeCompare(b.subjectName) || a.lessonYear.localeCompare(b.lessonYear)
    }
  )

  const reArrangeSubject = sortedMappedSubject.reduce((acc: any[], { subjectName, subjectCode, mark }: any) => {
    acc[subjectName] ??= {
      subjectName,
      subjectCode,
      data: []
    }

    acc[subjectName].data.push(mark)

    return acc
  }, {})

  const subjectProgresData: { subjectName: string; subjectCode: string; data: number[] }[] =
    Object.values(reArrangeSubject)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <StudentLeft studentData={data.result} studentMarksBySemester={studentMarksBySemester} />
      </Grid>
      <Grid item xs={12} md={8}>
        <StudentRight
          studentData={data.result}
          studentMarksBySemester={studentMarksBySemester}
          subjectProgresData={subjectProgresData}
        />
      </Grid>
    </Grid>
  )
}
