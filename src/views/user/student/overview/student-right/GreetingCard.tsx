// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Grid from '@mui/material/Grid'

const GreetingCard = () => {
  return (
    <Card className='bg-primary'>
      <Grid container className='min-h-[200px]'>
        <Grid item xs={7}>
          <CardContent>
            <Typography variant='body1' className='mbe-5 text-white'>
              Surabaya, 20 Desember 2024
            </Typography>
            <Typography variant='h4' className='mbe-2 text-white'>
              Selamat datang kembali, Jack!
            </Typography>
            <Typography variant='subtitle1' className='mbe-2 text-white'>
              Setiap hari adalah kesempatan untuk belajar dan mendapatkan ilmu baru dan menjadi kesempatan untuk
              memperbaiki diri
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={5}>
          <div className='relative bs-full is-full'>
            <img
              alt='Congratulations John'
              src='/images/illustrations/characters/8.png'
              className='max-bs-[180px] absolute block-end-0 inline-end-6 max-is-full'
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default GreetingCard
