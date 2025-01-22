import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

import classNames from 'classnames'

import styles from '../styles.module.css'

export default function GraduateInfo() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card className={classNames('shadow-none bg-transparent bg-cover', styles.bgImage)} elevation={0}>
          <CardContent className='flex flex-col items-center is-full text-center !plb-[5.8125rem] pli-5'>
            <Typography variant='h4' className='mbe-2.5'>
              Informasi Data Studi Lanjut dan Perangkingan Alumni SMAN 10 Surabaya
            </Typography>
            <Typography className='mbe-4 max-w-3xl'>
              Pelajari data berikut untuk mendapatkan gambaran dan peluang kamu untuk bisa lolos SNBP tahun ini.
            </Typography>
            <div className='flex items-center justify-center gap-4'>
              <Button
                href='https://docs.google.com/spreadsheets/d/1nRbOdPeHxZX6ow4jCrwJAn_tCR5CyqvTFNwe0AQESuY/edit?gid=411755761#gid=411755761'
                target='_blank'
              >
                Data Studi Lanjut
              </Button>
              <Button
                href='https://docs.google.com/spreadsheets/d/1OFN80bEGU32JDI8gNshEq27EbxU_bGGKTxfJxOl0iSI/edit?gid=1353842898#gid=1353842898'
                target='_blank'
              >
                Data Perankingan
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
