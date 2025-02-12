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
import { updateTeacherById } from '@/libs/actions/teachers'

// Actions

type FormValues = {
  id?: number
  name: string
  email: string
  placeOfBirth: string
  dateOfBirth: Date | null | undefined
}

interface Props {
  teacherData: {
    id: number
    name: string
    email: string
    placeOfBirth: string
    dateOfBirth: string
  }
}

const TeacherIdentity = ({ teacherData }: Props) => {
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
      name: teacherData.name,
      email: teacherData.email,
      placeOfBirth: teacherData.placeOfBirth,
      dateOfBirth: new Date(teacherData.dateOfBirth)
    }
  })

  useEffect(() => {
    reset({
      name: teacherData.name,
      email: teacherData.email,
      placeOfBirth: teacherData.placeOfBirth,
      dateOfBirth: new Date(teacherData.dateOfBirth)
    })
  }, [reset, teacherData.dateOfBirth, teacherData.email, teacherData.name, teacherData.placeOfBirth])

  const onSubmit = async (data: FormValues) => {
    const { email, name, placeOfBirth, dateOfBirth } = data

    const teacherDataPayload: any = {
      email,
      name,
      placeOfBirth,
      status: 'teacher',
      dateOfBirth: dateOfBirth?.toISOString()
    }

    setIsLoading(true)

    try {
      const teacherRes = await updateTeacherById(teacherData.id, teacherDataPayload)

      if (teacherRes.statusCode === 200) {
        toast.success(`Berhasil mengubah data!`)
        setIsLoading(false)
        back()

        return
      }

      setIsLoading(false)

      console.log(teacherRes)

      toast.error(`Gagal mengubah data! ${teacherRes.message}`)
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
    }
  }

  return (
    <Card>
      <CardHeader title='Identitas Guru' />
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

export default TeacherIdentity
