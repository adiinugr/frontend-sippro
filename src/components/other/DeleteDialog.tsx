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

const DeleteDialog = ({ open, isLoading, handleClose, handleSubmit }: Props) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Apakah kamu yakin ingin menghapus data ini?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Data akan dihapus secara permanen dan tidak akan bisa kembali lagi. Apa kamu yakin?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Tidak
          </Button>

          <Button disabled={isLoading} variant='contained' color='error' onClick={handleSubmit}>
            {isLoading ? 'Loading...' : 'Ya, Hapus Data'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteDialog
