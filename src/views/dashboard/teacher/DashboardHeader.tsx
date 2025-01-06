// MUI Imports

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Styles imports
// import { Button } from '@mui/material'

import styles from './styles.module.css'

const DashboardHeader = () => {
  return (
    <Card className={classnames('shadow-none bg-transparent bg-cover', styles.bgImage)} elevation={0}>
      <CardContent className='flex flex-col items-center is-full text-center !plb-[5.8125rem] pli-5'>
        <Typography variant='h4' className='mbe-2.5'>
          Selamat datang di halaman Admin!
        </Typography>
        <Typography className='mbe-4'>
          Pada website ini, Anda bisa mengelola sistem untuk kebutuhan informasi studi lanjut siswa.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardHeader
