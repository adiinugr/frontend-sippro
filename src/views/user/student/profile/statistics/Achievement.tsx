'use client'

import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import OptionMenu from '@/@core/components/option-menu'

// Types
import type { AchievementType } from '@/types/achievementTypes'

// Styles
import tableStyles from '@core/styles/table.module.css'

type Props = {
  achievementsData: AchievementType[]
}

const Achievement = ({ achievementsData }: Props) => {
  const router = useRouter()

  const limitAchievementsData = achievementsData.slice(0, 5)

  return (
    <Card className='bs-full'>
      <CardHeader
        title='Prestasi'
        subheader='Data Prestasi Tahun Pelajaran Ini'
        action={
          <OptionMenu
            options={[
              {
                text: 'Detail Prestasi',
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

      {achievementsData.length > 0 ? (
        <CardContent className='flex flex-row gap-4 items-center justify-center'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead className='uppercase'>
                  <tr className='border-be'>
                    <th className='leading-6 plb-4 pis-2 pli-2'>Kejuaraan</th>
                    <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Predikat</th>
                  </tr>
                </thead>
                <tbody>
                  {limitAchievementsData.map((row, index) => (
                    <tr key={index} className='border-0'>
                      <td className='pli-2 plb-3 pie-6'>
                        <Typography color='text.primary'>{row.title}</Typography>
                      </td>
                      <td className='pli-2 plb-3 pie-6 text-right'>
                        <Typography color='text.primary'>{row.medal}</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className='italic text-sm'>Tidak ada data</CardContent>
      )}
    </Card>
  )
}

export default Achievement
