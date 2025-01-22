// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

interface Props {
  open: boolean
  isLoading: boolean
  handleClose: () => void
  handleSubmit: () => void
}

const SafeConfirmDialog = ({ open, isLoading, handleClose, handleSubmit }: Props) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Apa kamu yakin?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Jika kamu menghapus kelas pada kelompok mapel, maka data siswa pada kelas tersebut akan ikut terhapus.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Tidak
          </Button>

          <Button disabled={isLoading} variant='contained' color='warning' onClick={handleSubmit}>
            {isLoading ? 'Loading...' : 'Ya, Simpan Data'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SafeConfirmDialog
