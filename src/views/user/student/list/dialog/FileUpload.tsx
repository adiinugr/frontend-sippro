'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'

// Third-party Imports
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'

// Component Imports
import { toast } from 'react-toastify'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { convertDateToIsoString } from '@/utils/date'
import { createStudent } from '@/libs/actions/students'

type FileProp = {
  name: string
  type: string
  size: number
}

type FileUploadProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const FileUpload = ({ open, setOpen }: FileUploadProps) => {
  // States
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/*': ['.xls', '.xlsx']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleFileUpload = async () => {
    const reader = new FileReader()

    setIsLoading(true)

    reader.onload = async event => {
      const workbook = XLSX.read(event?.target?.result, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const sheetData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false })

      const studentsData = sheetData.map(student => {
        return {
          email: student['EMAIL'],
          password: '12345678',
          name: student['NAMA SISWA'],
          nis: student['NIS'],
          nisn: student['NISN'],
          placeOfBirth: student['TEMPAT LAHIR'],
          dateOfBirth: convertDateToIsoString(student['TANGGAL LAHIR'])
        }
      })

      try {
        await Promise.all(
          studentsData.map(async data => {
            const res = await createStudent(data)

            if (res.statusCode !== 201) {
              res.result.response.message.length > 0
                ? toast.error(res.result.response.message[0])
                : toast.error(res.message)

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

    reader.readAsBinaryString(files[0])
  }

  const handleRemoveFile = () => {
    setFiles([])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>
          <i className='tabler-file-description' />
        </div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile()}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Import Data Siswa
        <Typography component='span' className='flex flex-col text-center'>
          Upload file import di bawah ini!
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <AppReactDropzone>
            <div {...getRootProps({ className: 'dropzone' })} {...(files.length && { sx: { height: 450 } })}>
              <input {...getInputProps()} />
              <div className='flex items-center flex-col'>
                <Avatar variant='rounded' className='bs-12 is-12 mbe-9 cursor-pointer'>
                  <i className='tabler-upload' />
                </Avatar>
                <Typography>
                  Drop files here or click{' '}
                  <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                    browse
                  </a>{' '}
                  thorough your machine
                </Typography>
              </div>
            </div>
            {files.length ? <List>{fileList}</List> : null}
          </AppReactDropzone>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button disabled={isLoading} variant='contained' type='submit' onClick={handleFileUpload}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FileUpload
