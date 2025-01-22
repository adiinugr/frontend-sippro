'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

// Third Party
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import SaveConfirmDialog from '@components/other/SaveConfirmDialog'

// Actions
import { updateSubjectGroupById } from '@/libs/actions/subjectGroups'
import {
  createClasroomsToSubjectGroup,
  deleteClassroomsToSubjectGroupByClassroomsId
} from '@/libs/actions/classroomsToSubjectGroups'

type FormValues = {
  lessonYearId: number
  gradeId: number
  classrooms: string[]
  name: string
}

interface Props {
  lessonYearData: { id: number; name: string }[]
  gradeData: { id: number; name: string }[]
  selectedClassrooms: { id: number; name: string }[]
  classroomData: any
  selectedData: any
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const AddSubjectGroupForm = ({ lessonYearData, gradeData, classroomData, selectedData }: Props) => {
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedClassrooms, setSelectedClassrooms] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const mappedClassroom: string[] = selectedData?.clsrmsToSbjgs.map((item: { classroom: { name: string } }) => {
    return item.classroom.name
  })

  // Hooks
  const {
    control,
    reset: resetForm,
    resetField,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      lessonYearId: selectedData?.lessonYearId,
      gradeId: selectedData?.gradeId,
      classrooms: mappedClassroom,
      name: selectedData?.name
    }
  })

  const gradeWatch = watch('gradeId')

  useEffect(() => {
    resetField('classrooms', { defaultValue: [] })
  }, [gradeWatch, resetField])

  const getClassroomsByGradeId = (gradeId: number) => {
    const selectedClassroomData: any = gradeData.filter(item => item.id === gradeId)

    return selectedClassroomData
  }

  const getClassroomsIdFromName = (classroomName: string) => {
    const filteredClassroom = classroomData.filter((classroom: { name: string }) => classroom.name === classroomName)

    return filteredClassroom[0].id
  }

  useEffect(() => {
    const classroomData = getClassroomsByGradeId(selectedData.gradeId as number)

    if (classroomData.length > 0) {
      setSelectedClassrooms(classroomData[0].classrooms)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomData, selectedData.gradeId])

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
      lessonYearId: selectedData?.lessonYearId,
      gradeId: selectedData?.gradeId,
      name: selectedData?.name,
      classrooms: mappedClassroom
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, selectedData])

  const onSubmit = async (data: FormValues) => {
    const previousClassrooms = mappedClassroom
    const currentClassrooms = data.classrooms

    const classroomsDiff = previousClassrooms
      .filter(x => !currentClassrooms.includes(x))
      .concat(currentClassrooms.filter(x => !previousClassrooms.includes(x)))

    setIsLoading(true)

    try {
      const subjectGroupRes = await updateSubjectGroupById(data, selectedData.id)

      if (subjectGroupRes.statusCode === 200) {
        const classroomToSubjectGroupPromise = await Promise.all(
          classroomsDiff.map(async classroom => {
            if (previousClassrooms.includes(classroom)) {
              const deleteRes = await deleteClassroomsToSubjectGroupByClassroomsId(
                getClassroomsIdFromName(classroom),
                selectedData.id
              )

              return deleteRes
            } else {
              const createRes = await createClasroomsToSubjectGroup({
                classroomId: getClassroomsIdFromName(classroom),
                subjectGroupId: selectedData.id
              })

              return createRes
            }
          })
        )

        const isResError = classroomToSubjectGroupPromise.some(el => el.statusCode === 400)

        if (isResError) {
          toast.error(`Gagal mengubah Data Mapel! Silakan hubungi Admin!`)
          setIsLoading(false)
          setOpenDialog(false)

          return
        }

        toast.success(`Berhasil mengubah Data Mapel!`)
        setIsLoading(false)
        setOpenDialog(false)

        push('/teacher/setting/subject-group/list')

        return
      }

      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal mengubah data! ${subjectGroupRes.message}`)
    } catch (error) {
      setIsLoading(false)
      setOpenDialog(false)

      toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Ubah Kelompok Mapel' />

        {lessonYearData.length == 0 && gradeData.length == 0 && selectedClassrooms.length == 0 ? (
          <CardContent className='text-center'>
            <CircularProgress size={34} />
          </CardContent>
        ) : (
          <CardContent>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lessonYearId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Tahun Pelajaran'
                        {...field}
                        error={Boolean(errors.lessonYearId)}
                        SelectProps={{ displayEmpty: true }}
                      >
                        <MenuItem value=''>Pilih Tahun Pelajaran</MenuItem>
                        {lessonYearData.map((data: { id: number; name: string }) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                  {errors.lessonYearId && <FormHelperText error>Tahun Pelajaran harus diisi!</FormHelperText>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='gradeId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Jenjang'
                        {...field}
                        error={Boolean(errors.gradeId)}
                        SelectProps={{ displayEmpty: true }}
                      >
                        {/* <MenuItem value=''>Pilih Jenjang</MenuItem> */}
                        {gradeData.map((data: { id: number; name: string }) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                  {errors.gradeId && <FormHelperText error>Jenjang harus diisi!</FormHelperText>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Nama Kelompok Mapel'
                        placeholder='Matematika TL, Biologi, Kimia, Fisika'
                        {...(errors.name && { error: true, helperText: 'Nama Kelompok Mapel harus diisi!' })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='classrooms'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Kelas'
                        {...field}
                        error={Boolean(errors.classrooms)}
                        SelectProps={{
                          multiple: true,
                          MenuProps,
                          renderValue: selected => (
                            <div className='flex flex-wrap gap-1'>
                              {(selected as unknown as string[]).map(value => (
                                <Chip key={value} label={value} size='small' />
                              ))}
                            </div>
                          )
                        }}
                      >
                        {/* <MenuItem value=''>Pilih Kelas</MenuItem> */}
                        {selectedClassrooms.map((data: { id: number; name: string }) => (
                          <MenuItem key={data.id} value={data.name}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                  {errors.classrooms && <FormHelperText error>Kelas harus diisi!</FormHelperText>}
                </Grid>
                <Grid item xs={12} className='grid justify-end'>
                  <Button
                    onClick={() => setOpenDialog(true)}
                    fullWidth
                    variant='contained'
                    className='capitalize w-fit'
                    startIcon={<i className='tabler-device-floppy' />}
                  >
                    Simpan Kelompok Mapel
                  </Button>
                </Grid>
              </Grid>{' '}
            </form>
          </CardContent>
        )}
      </Card>
      <SaveConfirmDialog
        open={openDialog}
        isLoading={isLoading}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </>
  )
}

export default AddSubjectGroupForm
