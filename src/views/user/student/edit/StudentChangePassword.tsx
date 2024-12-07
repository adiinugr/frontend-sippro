'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
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
import CustomTextField from '@core/components/mui/TextField'

type FormValues = {
  password: string
  confirmPassword: string
}

const StudentChangePassword = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = () => toast.success('Form Submitted')

  return (
    <Card>
      <CardHeader title='Identitas Siswa' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
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
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirmPassword'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Konfirmasi Password'
                    placeholder='············'
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
                    {...(errors.confirmPassword && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
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

export default StudentChangePassword
