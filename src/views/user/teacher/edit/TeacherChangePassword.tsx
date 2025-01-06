'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import CustomTextField from '@core/components/mui/TextField'
import { ChangePasswordSchema } from '@/views/user/student/edit/StudentChangePassword'

// Libs
import { resetTeacherPassword } from '@/libs/actions/auth'

type FormValues = {
  password: string
  confirmPassword: string
}

const TeacherChangePassword = ({ teacherId }: { teacherId: number }) => {
  const { push } = useRouter()

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      const studentRes = await resetTeacherPassword({ userId: teacherId, password: data.password })

      if (studentRes.statusCode === 200) {
        toast.success(`Berhasil mengubah data!`)
        setIsLoading(false)
        push('/teacher/user/teacher/list')

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
      <CardHeader title='Ganti Password' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Password'
                    placeholder='********'
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
                    {...(errors.password && { error: true, helperText: errors.password.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Konfirmasi Password'
                    placeholder='********'
                    id='form-validation-basic-confirm-password'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {isLoading ? 'Loading...' : 'Submit'}
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

export default TeacherChangePassword
