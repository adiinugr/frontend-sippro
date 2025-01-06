'use client'

// React Imports
import { useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Divider, Typography } from '@mui/material'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Actions
import { createTeacher } from '@/libs/actions/teachers'

type FormValues = {
  // eslint-disable-next-line lines-around-comment
  // Acoount
  email: string
  password: string

  // Identity
  name: string
  nis: string
  nisn: string
  placeOfBirth: string
  dateOfBirth: Date | null | undefined
}

const UserTeacherAdd = () => {
  const { push } = useRouter()

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      placeOfBirth: '',
      dateOfBirth: null
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: FormValues) => {
    const { email, password, name, placeOfBirth, dateOfBirth } = data

    const teacherData = {
      email,
      password,
      name,
      placeOfBirth,
      status: 'teacher',
      dateOfBirth: dateOfBirth?.toISOString()
    }

    setIsLoading(true)

    try {
      const teacherRes = await createTeacher(teacherData)

      if (teacherRes.statusCode === 201) {
        toast.success(`Berhasil menambahkan data!`)
        setIsLoading(false)
        push('/teacher/user/teacher/list')

        return
      }

      setIsLoading(false)

      toast.error(`Gagal menambahkan data! ${teacherRes.result.response.message[0]}`)
    } catch (error) {
      setIsLoading(false)
      console.log(error)

      toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
    }
  }

  return (
    <Card>
      <CardHeader title='Input Data Guru' />
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                1. Detail Akun
              </Typography>
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
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Password'
                    placeholder='············'
                    id='form-validation-basic-password'
                    type={isPasswordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...(errors.password && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                2. Identitas
              </Typography>
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
                    label='Nama Lengkap'
                    placeholder='John Doe'
                    {...(errors.name && { error: true, helperText: 'This field is required.' })}
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
                        label='Date Of Birth'
                        {...(errors.dateOfBirth && { error: true, helperText: 'This field is required.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {isLoading ? 'Loading...' : 'Simpan'}
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserTeacherAdd
