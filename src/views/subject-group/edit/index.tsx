'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubjectGroupEditListTable from './SubjectGroupEditListTable'
import AddSubjectGroupForm from './AddSubjectGroupForm'

// Actions
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'
import { fetchSubjects } from '@/libs/actions/subjects'
import { fetchClassrooms } from '@/libs/actions/classrooms'

interface Props {
  selectedData: {
    id: number
    name: string
    lessonYearId: number
    gradeId: number
    lessonYear: {
      id: number
      name: string
    }
    grade: {
      id: number
      name: string
    }
    sbjsToSbjgs: {
      subjectOrder: number
      subject: {
        id: number
        code: string
        name: string
      }
    }[]
    clsrmsToSbjgs: {
      classroom: {
        id: number
        name: string
      }
    }[]
  }
}

const SubjectGroupEditList = ({ selectedData }: Props) => {
  const [lessonYearData, setLessonYearData] = useState([])
  const [gradeData, setGradeData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [classroomData, setClassroomData] = useState([])

  const [selectedClassrooms, setSelectedClassrooms] = useState([])

  const mappedSubjectsData = selectedData?.sbjsToSbjgs.map(subject => {
    return {
      subjectOrder: Number(subject.subjectOrder),
      name: subject.subject.name
    }
  })

  useEffect(() => {
    async function fetchData() {
      const lessonYearRes = await fetchLessonYears()
      const gradeRes = await fetchGrades()
      const subjectRes = await fetchSubjects()
      const classroomRes = await fetchClassrooms()

      setLessonYearData(lessonYearRes.result)
      setGradeData(gradeRes.result)
      setSubjectData(subjectRes.result)
      setClassroomData(classroomRes.result)
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchClassroomData() {
      const classroomRes = await fetchClassrooms()

      const filteredClassroom = classroomRes.result.filter(
        (item: { gradeId: number }) => item.gradeId === selectedData.gradeId
      )

      const mappedFilteredClassroom = filteredClassroom.map((item: { id: number; name: string }) => {
        return {
          id: item.id,
          name: item.name
        }
      })

      setSelectedClassrooms(mappedFilteredClassroom)
    }

    fetchClassroomData()
  }, [selectedData?.gradeId])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddSubjectGroupForm
              lessonYearData={lessonYearData}
              gradeData={gradeData}
              selectedClassrooms={selectedClassrooms}
              classroomData={classroomData}
              selectedData={selectedData}
            />
          </Grid>
          <Grid item xs={12}>
            <SubjectGroupEditListTable
              mappedSubjectsData={mappedSubjectsData}
              subjectData={subjectData}
              selectedSubjectGroup={selectedData}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SubjectGroupEditList
