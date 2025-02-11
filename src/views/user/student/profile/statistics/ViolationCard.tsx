'use client'

// MUI Imports
import dynamic from 'next/dynamic'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@/@core/components/option-menu'
import type { StudentType } from '@/types/usersTypes'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

import tableStyles from '@core/styles/table.module.css'

const successColor = 'var(--mui-palette-success-main)'
const textSecondary = 'var(--mui-palette-text-secondary)'

type Props = {
  violationsData: StudentType['violations']
}

const ViolationCard = ({ violationsData }: Props) => {
  // Hook
  const theme = useTheme()
  const router = useRouter()

  const mappedViolation = violationsData.map(violation => {
    return { name: violation.rule.name, point: violation.rule.point }
  })

  const organizedViolations = mappedViolation.reduce((acc: any, { name, point }) => {
    acc[name] = acc[name] || { name, point: 0 }
    acc[name].point += point

    return acc
  }, {})

  const accumulateViolations = Object.values(organizedViolations)
  const sortedAccumulateViolations = accumulateViolations.sort((a: any, b: any) => b.point - a.point)

  const series = sortedAccumulateViolations.map((item: any) => item.point)
  const labels = sortedAccumulateViolations.map((item: any) => item.name)

  const options: ApexOptions = {
    colors: [
      successColor,
      'rgba(var(--mui-palette-success-mainChannel) / 0.7)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.5)',
      'var(--mui-palette-success-lightOpacity)'
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: true, theme: 'false' },
    dataLabels: { enabled: false },
    labels: labels,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: textSecondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: val => `${val}`,
              color: 'var(--mui-palette-text-primary)',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h3.fontSize as string
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              color: successColor,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.body1.fontSize as string
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { width: 200, height: 237 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 150, height: 199 }
        }
      }
    ]
  }

  return (
    <Card className='bs-full'>
      <CardHeader
        title='Pelanggaran'
        subheader='Data Pelanggaran Tahun Pelajaran Ini'
        action={
          <OptionMenu
            options={[
              {
                text: 'Detail Pelanggaran',
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
      {violationsData.length > 0 ? (
        <CardContent className='flex flex-col md:flex-row gap-4 items-center justify-center'>
          <div className='flex justify-center items-center py-4'>
            <AppReactApexCharts type='donut' width={250} height={250} series={series} options={options} />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead className='uppercase'>
                  <tr className='border-be'>
                    <th className='leading-6 plb-4 pis-6 pli-2'>Pelanggaran</th>
                    <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {violationsData.map((row, index) => (
                    <tr key={index} className='border-0'>
                      <td className='pli-2 plb-3 pie-6'>
                        <Typography color='text.primary'>{row.rule.name}</Typography>
                      </td>
                      <td className='pli-2 plb-3 pie-6 text-right'>
                        <Typography color='text.primary'>{row.rule.point}</Typography>
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

export default ViolationCard
