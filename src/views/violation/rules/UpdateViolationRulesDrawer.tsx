// MUI Imports
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FormHelperText, MenuItem } from '@mui/material'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { RuleType } from '@/types/ruleTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  ruleCategoriesData: { id: number; name: string }[]
  open: boolean
  isLoading: boolean
  selectedData: {
    id: number | null
    name: string
    point: number | string
    ruleCategory: {
      id: number | string
      name: string
    }
  }
  handleClose: () => void
  handleUpdate: (data: RuleType, id: number) => void
}

type FormValidateType = {
  name: string
  point: number | string
  ruleCategoryId: number | string
}

const UpdateViolationRulesDrawer = (props: Props) => {
  // Props
  const { open, isLoading, selectedData, handleClose, handleUpdate, ruleCategoriesData } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: selectedData.name,
      point: selectedData.point,
      ruleCategoryId: selectedData.ruleCategory.id
    }
  })

  useEffect(() => {
    resetForm({ name: selectedData.name, point: selectedData.point, ruleCategoryId: selectedData.ruleCategory.id })
  }, [resetForm, selectedData])

  const onSubmit = (data: RuleType) => {
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
        <Typography variant='h5'>Update Jenjang</Typography>
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
                label='Nama Pelanggaran'
                placeholder='Terlambat masuk sekolah'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div>
            <Controller
              name='ruleCategoryId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Kategori'
                  {...field}
                  error={Boolean(errors.ruleCategoryId)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Kategori</MenuItem>
                  {ruleCategoriesData.map((data: { id: number; name: string }) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            {errors.ruleCategoryId && <FormHelperText error>This field is required.</FormHelperText>}
          </div>
          <Controller
            name='point'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='number'
                label='Poin'
                placeholder='10'
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

export default UpdateViolationRulesDrawer
