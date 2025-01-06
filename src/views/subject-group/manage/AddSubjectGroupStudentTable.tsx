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
import UserStudentListTable from '@/views/subject-group/manage/table'

// Actions
import { createStudentsSubjectGroupsToClassrooms } from '@/libs/actions/studentsTosubjectGroupsToClassrooms'
import { getClasroomsToSubjectGroup } from '@/libs/actions/classroomsToSubjectGroups'

type AddStudentGroupProps = {
  open: boolean
  setOpen: (open: boolean) => void
  subjectGroup: {
    id: number
    name: string
  }
  classroom: {
    name: string
    id: number
  }
}

const AddSubjectGroupStudentTable = ({ open, setOpen, subjectGroup, classroom }: AddStudentGroupProps) => {
  const [rowSelection, setRowSelection] = useState({})

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectedStudentIds = Object.keys(rowSelection)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const subjectGroupToClassroomRes = await getClasroomsToSubjectGroup({
        subjectGroupId: subjectGroup.id,
        classroomId: classroom.id
      })

      const subjectGroupToClassroomId = subjectGroupToClassroomRes.result[0].id

      if (!subjectGroupToClassroomId) {
        toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
        setIsLoading(false)
        handleClose()

        return
      }

      await Promise.all(
        selectedStudentIds.map(async data => {
          const res = await createStudentsSubjectGroupsToClassrooms({
            classroomsToSubjectGroupId: subjectGroupToClassroomId,
            studentId: Number(data),
            classroomId: classroom.id
          })

          if (res.statusCode !== 201) {
            toast.error(res.message)
            setIsLoading(false)
            handleClose()

            console.log(res)

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
        {`Kelompok Mapel ${subjectGroup.name}`}
        <Typography component='span' className='flex flex-col text-center'>
          {`Kelas ${classroom.name}`}
        </Typography>
      </DialogTitle>

      <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
        <UserStudentListTable rowSelection={rowSelection} setRowSelection={setRowSelection} />
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

export default AddSubjectGroupStudentTable
