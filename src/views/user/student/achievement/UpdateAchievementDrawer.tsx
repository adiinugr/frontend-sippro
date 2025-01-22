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

// Component Imports
import { FormHelperText, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { AddAchievementType } from '@/types/achievementTypes'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type Props = {
  open: boolean
  isLoading: boolean
  selectedData: {
    id: number | null
    title: string
    category: string
    medal: string
    level: string
    organizer: string
    date: string
  }
  handleClose: () => void
  handleUpdate: (data: AddAchievementType, id: number) => void
}

type FormValidateType = AddAchievementType

const UpdateAchievementDrawer = (props: Props) => {
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
      title: selectedData.title,
      category: selectedData.category,
      medal: selectedData.medal,
      level: selectedData.level,
      organizer: selectedData.organizer,
      date: selectedData.date ? new Date(selectedData.date) : null
    }
  })

  useEffect(() => {
    resetForm({
      title: selectedData.title,
      category: selectedData.category,
      medal: selectedData.medal,
      level: selectedData.level,
      organizer: selectedData.organizer,
      date: selectedData.date ? new Date(selectedData.date) : null
    })
  }, [
    resetForm,
    selectedData.title,
    selectedData.category,
    selectedData.medal,
    selectedData.level,
    selectedData.organizer,
    selectedData.date
  ])

  const onSubmit = (data: AddAchievementType) => {
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
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Update Jenjang</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nama Kejuaraan'
                placeholder='Olimpiade Sains Nasional'
                {...(errors.title && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div>
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Kategori'
                  {...field}
                  error={Boolean(errors.category)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Kategori</MenuItem>
                  <MenuItem value='Akademik'>Akademik</MenuItem>
                  <MenuItem value='Non Akademik'>Non Akademik</MenuItem>
                </CustomTextField>
              )}
            />
            {errors.category && <FormHelperText error>This field is required.</FormHelperText>}
          </div>
          <div>
            <Controller
              name='medal'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Kategori'
                  {...field}
                  error={Boolean(errors.medal)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Predikat</MenuItem>
                  <MenuItem value='Juara 1 (Gold)'>Juara 1 (Gold)</MenuItem>
                  <MenuItem value='Juara 2 (Silver)'>Juara 2 (Silver)</MenuItem>
                  <MenuItem value='Juara 3 (Bronze)'>Juara 3 (Bronze)</MenuItem>
                  <MenuItem value='Harapan 1'>Harapan 1</MenuItem>
                  <MenuItem value='Harapan 2'>Harapan 2</MenuItem>
                  <MenuItem value='Harapan 3'>Harapan 3</MenuItem>
                  <MenuItem value='Lainnya'>Lainnya</MenuItem>
                </CustomTextField>
              )}
            />
            {errors.medal && <FormHelperText error>This field is required.</FormHelperText>}
          </div>
          <div>
            <Controller
              name='level'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Kategori'
                  {...field}
                  error={Boolean(errors.level)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Tingkat</MenuItem>
                  <MenuItem value='Kota/ Kabupaten'>Kota/ Kabupaten</MenuItem>
                  <MenuItem value='Provinsi'>Provinsi</MenuItem>
                  <MenuItem value='Nasional'>Nasional</MenuItem>
                  <MenuItem value='Internasional'>Internasional</MenuItem>
                  <MenuItem value='Lainnya'>Lainnya</MenuItem>
                </CustomTextField>
              )}
            />
            {errors.level && <FormHelperText error>This field is required.</FormHelperText>}
          </div>
          <Controller
            name='organizer'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Penyelenggara'
                placeholder='Dinas Pendidikan'
                {...(errors.organizer && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='date'
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
                    label='Tanggal Kejuaraan'
                    {...(errors.date && { error: true, helperText: 'This field is required.' })}
                  />
                }
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

export default UpdateAchievementDrawer
