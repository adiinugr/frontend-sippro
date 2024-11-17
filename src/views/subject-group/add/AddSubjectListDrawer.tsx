// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { SubjectGroupListType } from '@/types/subjectGroupTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  subjectData?: SubjectGroupListType[]
  setData: (data: SubjectGroupListType[]) => void
}

type FormValidateType = {
  subjectOrder: string
  name: string
}

const AddSubjectListDrawer = (props: Props) => {
  // Props
  const { open, handleClose, subjectData, setData } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      subjectOrder: '',
      name: ''
    }
  })

  const onSubmit = (data: FormValidateType) => {
    const newSubject: SubjectGroupListType = {
      id: (subjectData?.length && subjectData?.length + 1) || 1,
      subjectOrder: data.subjectOrder,
      name: data.name
    }

    setData([...(subjectData ?? []), newSubject])
    handleClose()
    resetForm({ subjectOrder: '', name: '' })
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
        <Typography variant='h5'>Tambahkan Mapel</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form className='flex flex-col gap-6 p-6'>
          <Controller
            name='subjectOrder'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='No Urut'
                placeholder='1'
                {...(errors.subjectOrder && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nama Mapel'
                placeholder='Matematika'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button type='button' variant='contained' onClick={handleSubmit(data => onSubmit(data))}>
              Save
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

export default AddSubjectListDrawer
