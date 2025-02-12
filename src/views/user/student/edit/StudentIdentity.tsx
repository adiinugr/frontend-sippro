'use client'

// MUI Imports
import { useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Actions
import { updateStudentById } from '@/libs/actions/students'

type FormValues = {
  id?: number
  name: string
  email: string
  nis: string
  nisn: string
  placeOfBirth: string
  dateOfBirth: Date | null | undefined
}

interface Props {
  studentData: {
    id: number
    name: string
    email: string
    nis: string
    nisn: string
    placeOfBirth: string
    dateOfBirth: string
  }
}

const StudentIdentity = ({ studentData }: Props) => {
  const { back } = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: studentData.name,
      email: studentData.email,
      nis: studentData.nis,
      nisn: studentData.nisn,
      placeOfBirth: studentData.placeOfBirth,
      dateOfBirth: new Date(studentData.dateOfBirth)
    }
  })

  useEffect(() => {
    reset({
      name: studentData.name,
      email: studentData.email,
      nis: studentData.nis,
      nisn: studentData.nisn,
      placeOfBirth: studentData.placeOfBirth,
      dateOfBirth: new Date(studentData.dateOfBirth)
    })
  }, [
    reset,
    studentData.dateOfBirth,
    studentData.email,
    studentData.name,
    studentData.nis,
    studentData.nisn,
    studentData.placeOfBirth
  ])

  const onSubmit = async (data: FormValues) => {
    const { email, name, nis, nisn, placeOfBirth, dateOfBirth } = data

    const studentDataPayload: any = {
      email,
      name,
      nis,
      nisn,
      placeOfBirth,
      dateOfBirth: dateOfBirth?.toISOString()
    }

    setIsLoading(true)

    try {
      const studentRes = await updateStudentById(studentData.id, studentDataPayload)

      if (studentRes.statusCode === 200) {
        toast.success(`Berhasil mengubah data!`)
        setIsLoading(false)
        back()

        return
      }

      setIsLoading(false)

      toast.error(`Gagal mengubah data! ${studentRes.message}`)
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
    }
  }

  return (
    <Card>
      <CardHeader title='Identitas Siswa' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Nama Lengkap'
                    placeholder='John Doe'
                    {...(errors.name && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johndoe@gmail.com'
                    {...(errors.email && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='nis'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='NIS'
                    placeholder='16251'
                    {...(errors.nis && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='nisn'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='NISN'
                    placeholder='00421514215'
                    {...(errors.nisn && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='placeOfBirth'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Tempat Lahir'
                    placeholder='Surabaya'
                    {...(errors.placeOfBirth && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='dateOfBirth'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomTextField
                        value={value}
                        onChange={onChange}
                        fullWidth
                        label='Tanggal Lahir'
                        {...(errors.dateOfBirth && { error: true, helperText: 'This field is required.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default StudentIdentity
