// MUI Imports
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FormHelperText, MenuItem } from '@mui/material'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { SubjectGroupListType } from '@/types/subjectGroupTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Actions
import { fetchSubjects } from '@/libs/actions/subjects'

type Props = {
  selectedEditSubject: { name: string; subjectOrder: number }
  open: boolean
  handleClose: () => void
  selectedSubjects?: SubjectGroupListType[]
  setData: (data: SubjectGroupListType[]) => void
}

type FormValidateType = {
  subjectOrder: number | string
  name: string
}

const EditSubjectListDrawer = (props: Props) => {
  // Props
  const { open, handleClose, selectedSubjects, setData, selectedEditSubject } = props

  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const subjectRes = await fetchSubjects()

      setSubjectList(subjectRes.result as any)
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
      subjectOrder: selectedEditSubject.subjectOrder,
      name: selectedEditSubject.name
    }
  })

  useEffect(() => {
    resetForm({ subjectOrder: selectedEditSubject.subjectOrder, name: selectedEditSubject.name })
  }, [resetForm, selectedEditSubject.name, selectedEditSubject.subjectOrder])

  const onSubmit = (data: FormValidateType) => {
    const newSubject: SubjectGroupListType = {
      subjectOrder: Number(data.subjectOrder) as number,
      name: data.name
    }

    const modifySubjects = selectedSubjects?.filter(items => items.name !== selectedEditSubject.name)

    setData([...(modifySubjects ?? []), newSubject])
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
                type='number'
                {...(errors.subjectOrder && { error: true, helperText: 'No Urut harus diisi!' })}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Mata Pelajaran'
                {...field}
                error={Boolean(errors.name)}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value=''>Pilih Mata Pelajaran</MenuItem>
                {subjectList.map((data: { id: number; name: string }) => (
                  <MenuItem key={data.id} value={data.name ?? ''}>
                    {data.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          {errors.name && <FormHelperText error>Mata Pelajaran harus diisi!</FormHelperText>}
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

export default EditSubjectListDrawer
