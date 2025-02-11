// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import { FormHelperText, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Types
import type { RuleType } from '@/types/ruleTypes'

// Types Import

type Props = {
  ruleCategoriesData: { id: number; name: string }[]
  open: boolean
  isLoading: boolean
  handleClose: () => void
  handleCreate: (data: RuleType) => void
}

type FormValidateType = {
  name: string
  point: number | string
  ruleCategoryId: number | string
}

const AddGradeDrawer = (props: Props) => {
  // Props
  const { open, isLoading, handleClose, handleCreate, ruleCategoriesData } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: '',
      point: '',
      ruleCategoryId: ''
    }
  })

  const onSubmit = (data: RuleType) => {
    const { name, point, ruleCategoryId } = data

    handleCreate({
      name,
      point: Number(point),
      ruleCategoryId: Number(ruleCategoryId)
    })
    handleClose()
    resetForm({ name: '', point: '', ruleCategoryId: '' })
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
        <Typography variant='h5'>Tambah Jenjang Baru</Typography>
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

export default AddGradeDrawer
