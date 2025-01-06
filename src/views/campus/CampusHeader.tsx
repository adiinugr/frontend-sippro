// MUI Imports

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Styles imports
import { Button } from '@mui/material'

import styles from './styles.module.css'

const CampusHeader = () => {
  return (
    <Card className={classnames('shadow-none bg-transparent bg-cover', styles.bgImage)} elevation={0}>
      <CardContent className='flex flex-col items-center is-full text-center !plb-[5.8125rem] pli-5'>
        <Typography variant='h4' className='mbe-2.5'>
          Passing Grade dan Daya Tampung Kampus
        </Typography>
        <Typography className='mbe-4'>
          Cek kampus idamanmu sekarang juga sebelum mendaftar untuk melihat tingkat persaingan dan peluang yang bisa
          kamu dapatkan.
        </Typography>
        <Button href='https://sidata-ptn-snpmb.bppp.kemdikbud.go.id/ptn_sb.php' target='_blank'>
          Lihat Sekarang
        </Button>
      </CardContent>
    </Card>
  )
}

export default CampusHeader
