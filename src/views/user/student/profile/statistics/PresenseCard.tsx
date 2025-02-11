'use client'

// MUI Imports

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@/@core/components/option-menu'

type DataType = {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

const data: DataType[] = [
  {
    stats: '8',
    title: 'Izin',
    color: 'primary',
    icon: 'tabler-clipboard-list'
  },
  {
    stats: '2',
    title: 'Sakit',
    color: 'info',
    icon: 'tabler-building-hospital'
  },
  {
    stats: '2',
    title: 'Alpha',
    color: 'error',
    icon: 'tabler-map-pin-question'
  }
]

const PresenseCard = () => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader
        title='Presensi'
        subheader='Data Presensi Tahun Pelajaran Ini'
        action={
          <OptionMenu
            options={[
              {
                text: 'Detail Presensi',
                linkProps: {
                  onClick: () => {
                    router.push('/')
                  }
                }
              }
            ]}
          />
        }
      />
      {false ? (
        <CardContent className='flex justify-between flex-wrap gap-4 md:pbs-2 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]'>
          <Grid container spacing={4}>
            {data.map((item, index) => (
              <Grid key={index} item xs className='flex items-center gap-4'>
                <CustomAvatar color={item.color} variant='rounded' size={40} skin='light'>
                  <i className={item.icon}></i>
                </CustomAvatar>
                <div className='flex flex-col'>
                  <Typography variant='h5'>{item.stats}</Typography>
                  <Typography variant='body2'>{item.title}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      ) : (
        <CardContent className='italic text-sm'>Data belum masuk</CardContent>
      )}
    </Card>
  )
}

export default PresenseCard
