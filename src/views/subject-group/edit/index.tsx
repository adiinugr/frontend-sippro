'use client'

import { useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// Component Imports
import SubjectGroupEditListTable from './SubjectGroupEditListTable'
import EditAction from './EditActions'
import AddSubjectGroupForm from './AddSubjectGroupForm'

// Actions
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'
import { updateSubjectGroupById } from '@/libs/actions/subjectGroups'
import { fetchSubjects } from '@/libs/actions/subjects'
import { createSubjectsToSubjectGroup, deleteSubjectsToSubjectGroupById } from '@/libs/actions/subjectsToSubjectGroups'
import { fetchClassrooms } from '@/libs/actions/classrooms'
import {
  createClasroomsToSubjectGroup,
  deleteClassroomsToSubjectGroupById
} from '@/libs/actions/classroomsToSubjectGroups'

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

type FormValues = {
  lessonYearId: number
  gradeId: number
  classrooms: string[]
  name: string
}

const SubjectGroupEditList = ({ selectedData }: Props) => {
  const { push } = useRouter()

  const [lessonYearData, setLessonYearData] = useState([])
  const [gradeData, setGradeData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [classroomData, setClassroomData] = useState([])

  const [selectedClassrooms, setSelectedClassrooms] = useState([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const mappedSubjectsData = selectedData.sbjsToSbjgs.map(subject => {
    return {
      subjectOrder: Number(subject.subjectOrder),
      name: subject.subject.name
    }
  })

  const mappedClassroom: string[] = selectedData.clsrmsToSbjgs.map(item => {
    return item.classroom.name
  })

  const [selectedSubjectData, setSelectedSubjectData] = useState(...[mappedSubjectsData])

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
  }, [selectedData.gradeId])

  // Hooks
  const {
    control,
    reset: resetForm,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lessonYearId: selectedData.lessonYearId,
      gradeId: selectedData.gradeId,
      classrooms: mappedClassroom,
      name: selectedData.name
    }
  })

  const getClassroomsByGradeId = (gradeId: number) => {
    const selectedClassroomData: { classrooms: any }[] = gradeData.filter((item: { id: number }) => item.id === gradeId)

    return selectedClassroomData
  }

  const gradeWatch = watch('gradeId')

  useEffect(() => {
    resetField('classrooms', { defaultValue: [] })
  }, [gradeWatch, resetField])

  useEffect(() => {
    const subscription = watch(value => {
      const classroomData = getClassroomsByGradeId(value.gradeId as number)

      if (classroomData.length > 0) {
        setSelectedClassrooms(classroomData[0].classrooms)
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeData, watch])

  useEffect(() => {
    resetForm({
      lessonYearId: selectedData.lessonYearId,
      gradeId: selectedData.gradeId,
      name: selectedData.name,
      classrooms: mappedClassroom
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, selectedData])

  const onSubmit = async (data: FormValues) => {
    const mappedSubjectData = selectedSubjectData.map((subject: { name: string; subjectOrder: number }) => {
      const filteredData: { id: number }[] = subjectData.filter((value: { name: string }) => value.name == subject.name)

      return {
        subjectOrder: subject.subjectOrder,
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
      const subjectGroupRes = await updateSubjectGroupById(data, selectedData.id)

      if (subjectGroupRes.statusCode === 200) {
        await deleteSubjectsToSubjectGroupById(selectedData.id)

        await deleteClassroomsToSubjectGroupById(selectedData.id)

        const subjectToSubjectGroupPromise = await Promise.all(
          mappedSubjectData.map(async data => {
            await createSubjectsToSubjectGroup({
              subjectOrder: data.subjectOrder,
              subjectId: data.id,
              subjectGroupId: subjectGroupRes.result.id
            })
          })
        )

        const classroomToSubjectGroupPromise = await Promise.all(
          mappedClassroomData.map(async data => {
            await createClasroomsToSubjectGroup({
              classroomId: data.id,
              subjectGroupId: subjectGroupRes.result.id
            })
          })
        )

        await Promise.all([subjectToSubjectGroupPromise, classroomToSubjectGroupPromise])
          .then(() => {
            toast.success(`Berhasil mengubah data!`)
            setIsLoading(false)
            push('/teacher/setting/subject-group/list')
          })
          .catch(() => {
            toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
            setIsLoading(false)
          })

        setIsLoading(false)

        return
      }

      setIsLoading(false)

      toast.error(`Gagal mengubah data! ${subjectGroupRes.message}`)
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
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
              <SubjectGroupEditListTable
                data={selectedSubjectData}
                setData={setSelectedSubjectData}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <EditAction isLoading={isLoading} />
        </Grid>
      </Grid>
    </form>
  )
}

export default SubjectGroupEditList
