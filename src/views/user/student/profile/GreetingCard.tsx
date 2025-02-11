'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Third Party
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

// Types
import type { StudentType } from '@/types/usersTypes'

type Props = {
  studentData: StudentType
}

const GreetingCard = ({ studentData }: Props) => {
  const currentDate = format(new Date(), 'dd MMMM yyyy', {
    locale: id
  })

  return (
    <Card className='bg-primary'>
      <Grid container className='min-h-[200px]'>
        <Grid item xs={12} md={7}>
          <CardContent>
            <Typography variant='body1' className='mbe-5 text-gray-200'>
              Surabaya, {currentDate}
            </Typography>
            <Typography variant='h4' className='mbe-2 text-gray-200'>
              Selamat datang kembali, {studentData.name}!
            </Typography>
            <Typography variant='subtitle1' className='mbe-2 text-gray-200'>
              Setiap hari adalah kesempatan untuk belajar dan mendapatkan ilmu baru dan menjadi kesempatan untuk
              memperbaiki diri
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={5} className='hidden md:block'>
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
