import { CardHeader, Card, CardContent, Grid } from '@mui/material'

// Ccomponents

import PresenseCard from '@/views/user/student/profile/statistics/PresenseCard'
import ViolationCard from '@/views/user/student/profile/statistics/ViolationCard'
import StudentInfo from '@/views/user/student/profile/StudentInfo'
import StudentReportStats from '@/views/user/student/profile/statistics/StudentReportStats'
import GreetingCard from '@/views/user/student/profile/GreetingCard'
import ReportBarChart from '@/views/user/student/profile/statistics/ReportBarChart'
import SubjectLineChart from '@/views/user/student/profile/statistics/SubjectLineChart'
import Achievement from '@/views/user/student/profile/statistics/Achievement'

type Props = {
  data: any
}

export default function StudentProfile({ data }: Props) {
  const subjectGroup = data?.result?.stTSbgTc?.map(
    (item: { clsrmsToSbjg: { subjectGroup: { lessonYear: { name: string } } } }) => {
      return item.clsrmsToSbjg.subjectGroup.lessonYear.name
    }
  )

  const sortedSubjectGroup = subjectGroup.sort((a: string, b: string) => {
    return a.localeCompare(b)
  })

  const getMarksBySemesterAndLessonYear = (semester: string, lessonYear: string) => {
    const marks = data.result.marks.filter(
      (mark: { subjectGroup: { lessonYear: { name: string } }; semester: string }) =>
        mark.subjectGroup.lessonYear.name === lessonYear && mark.semester === semester
    )

    return marks
  }

  const semester1Mark = getMarksBySemesterAndLessonYear('Semester 1', sortedSubjectGroup[0])
  const semester2Mark = getMarksBySemesterAndLessonYear('Semester 2', sortedSubjectGroup[0])
  const semester3Mark = getMarksBySemesterAndLessonYear('Semester 1', sortedSubjectGroup[1])
  const semester4Mark = getMarksBySemesterAndLessonYear('Semester 2', sortedSubjectGroup[1])
  const semester5Mark = getMarksBySemesterAndLessonYear('Semester 1', sortedSubjectGroup[2])
  const semester6Mark = getMarksBySemesterAndLessonYear('Semester 2', sortedSubjectGroup[2])

  const studentMarksBySemester: { semester: number; marks: any[] }[] = [
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

  const tabDataFunction = () => {
    const data: { type: string; avatarIcon: string; series: { data: number[] }[]; categories: string[] }[] = []

    studentMarksBySemester.map(item => {
      const markData: number[] = []
      const subject: string[] = []

      item.marks.forEach(mark => {
        markData.push(Number(mark.mark))
        subject.push(mark.subject.code)
      })

      data.push({
        type: `smt-${item.semester}`,
        avatarIcon: `tabler-number-${item.semester}`,
        series: [{ data: markData }],
        categories: subject
      })
    })

    return data
  }

  const violationsData = data.result.violations
  const achievementsData = data.result.achievements

  const isEveryMarksZero = subjectProgresData.every(val => val.data.every(item => item === 0))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GreetingCard studentData={data.result} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StudentInfo studentData={data.result} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ReportBarChart tabData={tabDataFunction()} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <PresenseCard />
          </Grid>
          <Grid item xs={12}>
            <StudentReportStats studentMarksBySemester={studentMarksBySemester} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <ViolationCard violationsData={violationsData} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Achievement achievementsData={achievementsData} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Progres Nilai' subheader='Data fluktuasi nilai semua mapel pada tiap-tiap semester' />
          <CardContent>
            <Grid container spacing={6}>
              {!isEveryMarksZero &&
                subjectProgresData.map((data: any) => (
                  <Grid key={data.subjectCode} item xs={12} sm={6} md={3} xl={2}>
                    <SubjectLineChart data={data} />
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
