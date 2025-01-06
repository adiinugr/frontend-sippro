// MUI Imports
import Button from '@mui/material/Button'

import type { ButtonProps } from '@mui/material/Button'

// Component Imports

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import FileUpload from '@/views/user/student/list/dialog/FileUpload'

const DialogImportStudents = () => {
  // Vars
  const buttonProps: ButtonProps = {
    color: 'secondary',
    variant: 'tonal',
    startIcon: <i className='tabler-upload' />,
    className: 'max-sm:is-full',
    children: 'Import'
  }

  return <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={FileUpload} />
}

export default DialogImportStudents
