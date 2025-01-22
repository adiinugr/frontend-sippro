import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

import classNames from 'classnames'

import styles from '../styles.module.css'

export default function Sample() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card className={classNames('shadow-none bg-transparent bg-cover', styles.bgImage)} elevation={0}>
          <CardContent className='flex flex-col items-center is-full text-center !plb-[5.8125rem] pli-5'>
            <Typography variant='h4' className='mbe-2.5'>
              Mata Pelajaran Pendukung Program Studi dalam SNBP
            </Typography>
            <Typography className='mbe-4 max-w-4xl'>
              Berikut ini adalah Mata Pelajaran Pendukung Prodi yang dapat kamu jadikan acuan untuk memilih prodi atau
              jurusan terbaikmu. Hal ini sesuai dengan Keputusan Menteri No 345/M/2022.
            </Typography>
            <Button href='/pdf/Kepmen 345M2022 Mapel Pendukung Prodi.pdf' target='_blank'>
              Lihat File
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
