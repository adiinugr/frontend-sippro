'use client'

// React Imports

import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'

// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { fetchClassrooms } from '@/libs/actions/classrooms'

// Add type for classroom
type Classroom = {
  id: number
  name: string
}

// Add props type
type ViolationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  filteredData?: any[]
  handleExport: (classrooms: string[], splitFile: boolean) => void
}

const ViolationDialog = ({ open, setOpen, handleExport }: ViolationDialogProps) => {
  // Update state type
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([])
  const [splitFile, setSplitFile] = useState<boolean>(false)
  const [selectAllClassrooms, setSelectAllClassrooms] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const classrooms = await fetchClassrooms()

      if (classrooms.result) {
        setClassrooms(classrooms.result)
      }
    }

    fetchData()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const classroomsToExport = selectAllClassrooms ? classrooms.map(c => c.name) : selectedClassrooms

    if (typeof handleExport === 'function') {
      handleExport(classroomsToExport, splitFile)
    }

    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Export Data
        <Typography component='span' className='flex flex-col text-center'>
          Pilih setting untuk mengekspor data pelanggaran.
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                onChange={(_, checked) => setSelectAllClassrooms(checked)}
                control={<Switch defaultChecked={selectAllClassrooms} />}
                label='Export Semua Kelas?'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                onChange={(_, checked) => setSplitFile(checked)}
                control={<Switch defaultChecked={splitFile} />}
                label='Pisahkan File?'
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Kelas'
                value={selectedClassrooms}
                disabled={selectAllClassrooms}
                SelectProps={{
                  multiple: true,
                  onChange: e => setSelectedClassrooms(e.target.value as string[]),
                  renderValue: selected => (
                    <div className='flex items-center gap-2'>
                      {(selected as string[]).map(value => (
                        <Chip key={value} label={value} className='capitalize' size='small' />
                      ))}
                    </div>
                  ),
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 300
                      }
                    }
                  }
                }}
              >
                {classrooms.map(classroom => (
                  <MenuItem key={classroom.id} value={classroom.name}>
                    {classroom.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            Export
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ViolationDialog
