'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// Component Imports

import SubjectGroupEditListTable from './SubjectGroupEditListTable'
import AddActions from './AddActions'
import AddSubjectGroupForm from './AddSubjectGroupForm'
import { fetchLessonYears } from '@/libs/actions/lessonYears'
import { fetchGrades } from '@/libs/actions/grades'

import { updateSubjectGroupById } from '@/libs/actions/subjectGroups'
import { fetchSubjects } from '@/libs/actions/subjects'
import { createSubjectsToSubjectGroup, deleteSubjectsToSubjectGroupById } from '@/libs/actions/subjectsToSubjectGroups'

interface Props {
  selectedData: {
    id: number
    name: string
    lessonYearId: number
    gradeId: number
    lessonYear: {
      name: string
    }
    grade: {
      name: string
    }
    subjectsToSubjectGroups: {
      subjectOrder(subjectOrder: number): number
      subject: {
        id: number
        code: string
        name: string
      }
    }[]
  }
}

type FormValues = {
  lessonYearId: number
  gradeId: number
  name: string
}

const SubjectGroupEditList = ({ selectedData }: Props) => {
  const { push } = useRouter()

  const [lessonYearData, setLessonYearData] = useState([])
  const [gradeData, setGradeData] = useState([])
  const [subjectData, setSubjectData] = useState([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const mappedSubjectsData = selectedData.subjectsToSubjectGroups.map(subject => {
    return {
      subjectOrder: Number(subject.subjectOrder),
      name: subject.subject.name
    }
  })

  const [selectedSubjectData, setSelectedSubjectData] = useState(...[mappedSubjectsData])

  // console.log(mappedSubjectsData)

  useEffect(() => {
    async function fetchData() {
      const lessonYearRes = await fetchLessonYears()
      const gradeRes = await fetchGrades()
      const subjectRes = await fetchSubjects()

      setLessonYearData(lessonYearRes.result)
      setGradeData(gradeRes.result)

      setSubjectData(subjectRes.result)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lessonYearId: selectedData.lessonYearId,
      gradeId: selectedData.gradeId,
      name: selectedData.name
    }
  })

  useEffect(() => {
    resetForm({ lessonYearId: selectedData.lessonYearId, gradeId: selectedData.gradeId, name: selectedData.name })
  }, [resetForm, selectedData])

  const onSubmit = async (data: FormValues) => {
    const mappedSubjectData = selectedSubjectData.map((subject: { name: string; subjectOrder: number }) => {
      const filteredData: { id: number }[] = subjectData.filter((value: { name: string }) => value.name == subject.name)

      return {
        subjectOrder: subject.subjectOrder,
        id: filteredData[0].id
      }
    })

    setIsLoading(true)

    try {
      const subjectGroupRes = await updateSubjectGroupById(data, selectedData.id)

      if (subjectGroupRes.statusCode === 200) {
        await deleteSubjectsToSubjectGroupById(selectedData.id)

        await Promise.all(
          mappedSubjectData.map(async data => {
            await createSubjectsToSubjectGroup({
              subjectOrder: data.subjectOrder,
              subjectId: data.id,
              subjectGroupId: subjectGroupRes.result.id
            })
          })
        )
          .then(() => {
            toast.success(`Berhasil menambahkan data!`)
            setIsLoading(false)
            push('/setting/subject-group/list')
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
          <AddActions isLoading={isLoading} reset={resetForm} />
        </Grid>
      </Grid>
    </form>
  )
}

export default SubjectGroupEditList
