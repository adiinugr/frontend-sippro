'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// Type Imports
import type { SubjectGroupListType } from '@/types/subjectGroupTypes'

// Component Imports
import SubjectGroupAddListTable from './SubjectGroupAddListTable'
import AddActions from './AddActions'
import AddSubjectGroupForm from './AddSubjectGroupForm'
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'

type FormValues = {
  studyYear: string
  grade: string
  name: string
}

const SubjectGroupAddList = ({ subjectData }: { subjectData?: SubjectGroupListType[] }) => {
  const [lessonYearData, setLessonYearData] = useState([])
  const [gradeData, setGradeData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const lessonYearRes = await fetchLessonYears()
      const gradeRes = await fetchGrades()

      setLessonYearData(lessonYearRes.result)
      setGradeData(gradeRes.result)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      studyYear: '',
      grade: '',
      name: ''
    }
  })

  const onSubmit = () => toast.success('Form Submitted')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <AddSubjectGroupForm
                control={control}
                errors={errors}
                lessonYearData={lessonYearData}
                gradeData={gradeData}
              />
            </Grid>
            <Grid item xs={12}>
              <SubjectGroupAddListTable
                tableData={subjectData}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <AddActions reset={reset} />
        </Grid>
      </Grid>
    </form>
  )
}

export default SubjectGroupAddList
