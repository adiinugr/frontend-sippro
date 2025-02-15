// MUI Imports
import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// Component Imports
import { Controller, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../DialogCloseButton'
import { createPermission, updatePermission } from '@/libs/actions/permissions'

type PermissionDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: string
  id: number
}

type FormValidateType = {
  name: string
}

type EditProps = {
  handleClose: () => void
  data: string
  id: number
}

const AddContent = ({ handleClose }: { handleClose: () => void }) => {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: ''
    }
  })

  const handleAddContent = async (data: FormValidateType) => {
    setIsLoadingCreate(true)

    try {
      const res = await createPermission(data)

      setIsLoadingCreate(false)

      if (res.statusCode === 201) {
        toast.success(`Berhasil menambah data!`)
        handleClose()

        return
      }

      toast.error(`Gagal menambah data! ${res.result ? res.result.response.message[0] : ''}`)
    } catch (error) {
      setIsLoadingCreate(false)

      toast.error(`Gagal menambah data!`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(data => handleAddContent(data))}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nama Permission'
                variant='outlined'
                placeholder='Basis Data'
                className='mbe-2'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
        </DialogContent>
        <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button disabled={isLoadingCreate} type='submit' variant='contained'>
            {isLoadingCreate ? 'Loading...' : 'Create Permission'}
          </Button>
          <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
            Discard
          </Button>
        </DialogActions>
      </form>
    </>
  )
}

const EditContent = ({ handleClose, data, id }: EditProps) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

  // Hooks
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: data
    }
  })

  useEffect(() => {
    resetForm({
      name: data
    })
  }, [data, resetForm])

  const handleEditContent = async (data: FormValidateType) => {
    setIsLoadingUpdate(true)

    try {
      const res = await updatePermission(id, { name: data.name })

      setIsLoadingUpdate(false)

      if (res.statusCode === 200) {
        toast.success(`Berhasil mengupdate data!`)
        handleClose()

        return
      }

      toast.error(`Gagal mengupdate data! ${res.result ? res.result.response.message[0] : ''}`)
    } catch (error) {
      setIsLoadingUpdate(false)

      toast.error(`Gagal mengupdate data!`)
    }
  }

  return (
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
      <Alert severity='warning' className='mbe-8'>
        <AlertTitle>Perhatian!</AlertTitle>
        Dengan mengedit nama izin, Anda mungkin merusak fungsi izin sistem. Harap pastikan Anda benar-benar yakin
        sebelum melanjutkan.
      </Alert>
      <form onSubmit={handleSubmit(data => handleEditContent(data))}>
        <div className='flex items-end gap-4 mbe-2'>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nama Permission'
                variant='outlined'
                placeholder='Basis Data'
                {...(errors.name && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Button disabled={isLoadingUpdate} type='submit' variant='contained'>
            {isLoadingUpdate ? 'Loading...' : 'Update'}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

const PermissionDialog = ({ open, setOpen, data, id }: PermissionDialogProps) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Edit Permission' : 'Tambah Permission Baru'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit izin sesuai kebutuhan Anda.' : 'Izin yang dapat Anda gunakan dan berikan kepada pengguna Anda.'}
        </Typography>
      </DialogTitle>
      {data ? <EditContent handleClose={handleClose} data={data} id={id} /> : <AddContent handleClose={handleClose} />}
    </Dialog>
  )
}

export default PermissionDialog
