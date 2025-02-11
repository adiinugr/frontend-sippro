// MUI Imports
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { StudyYearType } from '@/types/lessonYearTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  isLoading: boolean
  selectedData: { id: number | null; name: string }
  handleClose: () => void
  handleUpdate: (data: StudyYearType, id: number) => void
}

type FormValidateType = {
  name: string
}

const UpdateStudyYearDrawer = (props: Props) => {
  // Props
  const { open, isLoading, selectedData, handleClose, handleUpdate } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: selectedData.name
    }
  })

  useEffect(() => {
    resetForm(selectedData)
  }, [resetForm, selectedData])

  const onSubmit = (data: StudyYearType) => {
    handleUpdate(data, selectedData.id as number)
    handleClose()
  }

  const handleReset = () => {
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Update Tahun Pelajaran</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Tahun Pelajaran'
                placeholder='2023-2024'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button disabled={isLoading} variant='contained' type='submit'>
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default UpdateStudyYearDrawer
