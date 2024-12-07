// MUI Imports
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import { FormHelperText, MenuItem } from '@mui/material'

import type { ClassroomType } from '@/types/classroomTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { fetchGrades } from '@/libs/actions/grades'

type Props = {
  open: boolean
  isLoading: boolean
  selectedData: {
    id: number | null
    name: string
    grade: {
      id: number | string
    }
  }
  handleClose: () => void
  handleUpdate: (data: ClassroomType, id: number) => void
}

type FormValidateType = {
  name: string
  gradeId: number | string
}

const UpdateClassroomDrawer = (props: Props) => {
  // Props
  const { open, isLoading, selectedData, handleClose, handleUpdate } = props

  // States
  const [gradeData, setGradeData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const gradeRes = await fetchGrades()

      setGradeData(gradeRes.result)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: selectedData.name,
      gradeId: selectedData.grade.id
    }
  })

  useEffect(() => {
    resetForm({
      name: selectedData.name,
      gradeId: selectedData.grade.id
    })
  }, [resetForm, selectedData])

  const onSubmit = (data: ClassroomType) => {
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
        <Typography variant='h5'>Update Kelas</Typography>
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
                label='Kelas'
                placeholder='X'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div>
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
                  <MenuItem value=''>Pilih Jenjang</MenuItem>
                  {gradeData.map((data: { id: number; name: string }) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            {errors.gradeId && <FormHelperText error>Jenjang harus diisi!</FormHelperText>}{' '}
          </div>
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

export default UpdateClassroomDrawer
