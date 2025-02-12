'use client'

import { useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubjectGroupAddListTable from './SubjectGroupAddListTable'
import AddActions from './AddActions'
import AddSubjectGroupForm from './AddSubjectGroupForm'

// Actions
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'
import { createSubjectGroup } from '@/libs/actions/subjectGroups'
import { fetchSubjects } from '@/libs/actions/subjects'
import { createSubjectsToSubjectGroup } from '@/libs/actions/subjectsToSubjectGroups'
import { fetchClassrooms } from '@/libs/actions/classrooms'
import { createClasroomsToSubjectGroup } from '@/libs/actions/classroomsToSubjectGroups'

type FormValues = {
  lessonYearId: number | string
  gradeId: number | string
  classrooms: number[]
  name: string
}

const SubjectGroupAddList = () => {
  const { push } = useRouter()

  const [lessonYearData, setLessonYearData] = useState([])
  const [gradeData, setGradeData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [classroomData, setClassroomData] = useState([])

  const [selectedClassrooms, setSelectedClassrooms] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      const lessonYearRes = await fetchLessonYears()
      const gradeRes = await fetchGrades()
      const subjectRes = await fetchSubjects()
      const classroomRes = await fetchClassrooms()

      setLessonYearData(lessonYearRes.result as any)
      setGradeData(gradeRes.result as any)
      setSubjectData(subjectRes.result as any)
      setClassroomData(classroomRes.result as any)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      lessonYearId: '',
      gradeId: '',
      classrooms: [],
      name: ''
    }
  })

  const gradeWatch = watch('gradeId')

  useEffect(() => {
    resetField('classrooms')
  }, [gradeWatch, resetField])

  useEffect(() => {
    const subscription = watch(value => {
      const selectedClassroomData: { classrooms: any }[] = gradeData.filter(
        (item: { id: number }) => item.id === value.gradeId
      )

      if (selectedClassroomData.length > 0) {
        setSelectedClassrooms(selectedClassroomData[0].classrooms)
      }
    })

    return () => subscription.unsubscribe()
  }, [gradeData, watch])

  const onSubmit = async (data: FormValues) => {
    const mappedSubjectData = selectedSubjects.map((subject: { name: string; subjectOrder: number }) => {
      const filteredData: { id: number }[] = subjectData.filter((value: { name: string }) => value.name == subject.name)

      return {
        subjectOrder: Number(subject.subjectOrder),
        id: filteredData[0].id
      }
    })

    const mappedClassroomData = data.classrooms.map((classroom: any) => {
      const filteredClassrooms: { id: number; name: string }[] = classroomData.filter(
        (value: { name: string }) => value.name == classroom
      )

      return {
        id: filteredClassrooms[0].id
      }
    })

    setIsLoading(true)

    try {
      const subjectGroupRes = await createSubjectGroup(data)

      if (subjectGroupRes.statusCode === 201) {
        const subjectToSubjectGroupPromise = await Promise.all(
          mappedSubjectData.map(async data => {
            await createSubjectsToSubjectGroup({
              subjectOrder: data.subjectOrder,
              subjectId: data.id,
              subjectGroupId: subjectGroupRes?.result?.id
            })
          })
        )

        const classroomToSubjectGroupPromise = await Promise.all(
          mappedClassroomData.map(async data => {
            await createClasroomsToSubjectGroup({
              classroomId: data.id,
              subjectGroupId: subjectGroupRes?.result?.id
            })
          })
        )

        await Promise.all([subjectToSubjectGroupPromise, classroomToSubjectGroupPromise])
          .then(() => {
            toast.success(`Berhasil menambahkan data!`)
            setIsLoading(false)
            push('/teacher/setting/subject-group/list')
          })
          .catch(() => {
            toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
            setIsLoading(false)
          })

        setIsLoading(false)

        return
      }

      setIsLoading(false)

      toast.error(`Gagal menambahkan data! ${subjectGroupRes.message}`)
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
    }
  }

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
                selectedClassrooms={selectedClassrooms}
              />
            </Grid>
            <Grid item xs={12}>
              <SubjectGroupAddListTable
                selectedSubjects={selectedSubjects}
                setSelectedSubjects={setSelectedSubjects}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <AddActions isLoading={isLoading} />
        </Grid>
      </Grid>
    </form>
  )
}

export default SubjectGroupAddList
