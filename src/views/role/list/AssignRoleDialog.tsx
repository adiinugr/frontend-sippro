'use client'

import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

// Third Party
import { toast } from 'react-toastify'

// Component Imports
import DialogCloseButton from '@components/dialogs/DialogCloseButton'
import TeacherDialog from '@/views/role/dialog-table'

// Actions
import { createTeacherToRole } from '@/libs/actions/teachersToRoles'

type RoleDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  roleId: number
}

const AssignRoleDialog = ({ open, setOpen, roleId }: RoleDialogProps) => {
  const [rowSelection, setRowSelection] = useState({})

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectedTeacherIds = Object.keys(rowSelection)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await Promise.all(
        selectedTeacherIds.map(async data => {
          const res = await createTeacherToRole({
            teacherId: Number(data),
            roleId
          })

          if (res.statusCode !== 201) {
            toast.error(res.message)
            setIsLoading(false)
            handleClose()

            return
          }

          toast.success(`Berhasil menambahkan data!`)
          setIsLoading(false)
          handleClose()
        })
      )
    } catch (error) {
      toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
      setIsLoading(false)
      handleClose()
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {`Tambahkan Guru`}
        <Typography component='span' className='flex flex-col text-center'>
          {`Pilih yang ingin ditambahkan sesuai dengan Role yang dipilih.`}
        </Typography>
      </DialogTitle>

      <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
        <TeacherDialog rowSelection={rowSelection} setRowSelection={setRowSelection} />
      </DialogContent>
      <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
        <Button disabled={isLoading} variant='contained' type='submit' onClick={handleSubmit}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
        <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AssignRoleDialog
