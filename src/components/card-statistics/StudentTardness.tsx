'use client'

// React Imports
import { useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Mui Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useTheme } from '@mui/material/styles'

// Third Party
import { getDate, getMonth, getYear } from 'date-fns'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

import type { ViolationType } from '@/types/violationTypes'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Style Imports
import './styles.css'

const options = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const monthsData = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']

const MonthButton = ({
  selectedIndex,
  setSelectedIndex
}: {
  selectedIndex: number
  setSelectedIndex: (val: number) => void
}) => {
  // States
  const [open, setOpen] = useState<boolean>(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const handleMenuItemClick = (event: SyntheticEvent, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ButtonGroup variant='tonal' ref={anchorRef} aria-label='split button' size='small'>
        <Button>{options[selectedIndex]}</Button>
        <Button
          className='pli-0 plb-[5px]'
          aria-haspopup='menu'
          onClick={handleToggle}
          aria-label='select merge strategy'
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'split-button-menu' : undefined}
        >
          <i className='tabler-chevron-down text-xl' />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition placement='bottom-end'>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}>
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const StudentTardiness = ({ violationsData }: { violationsData?: ViolationType[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Hooks
  const theme = useTheme()

  const currentYear = getYear(new Date())

  const filteredViolationDataByTardness = violationsData?.filter(item => {
    const year = getYear(new Date(item.date))
    const month = getMonth(new Date(item.date))

    return item.rule.name === 'Datang terlambat masuk sekolah' && year === currentYear && month === selectedIndex
  })

  const mappedTardness = filteredViolationDataByTardness?.map(item => {
    const newDate = new Date(item.date)
    const date = getDate(newDate)
    const month = getMonth(newDate)
    const year = getYear(newDate)

    return {
      date: `${date} ${monthsData[month]}`,
      month,
      year
    }
  })

  const tardnessObj = mappedTardness?.reduce(function (obj: any, v) {
    obj[v.date] = (obj[v.date] || 0) + 1

    return obj
  }, {})

  const series = [
    {
      name: 'Keterlambatan',
      type: 'column',
      data: Object.values(tardnessObj) as number[]
    }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'line',
      stacked: false,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    markers: {
      size: 5,
      colors: '#fff',
      strokeColors: 'var(--mui-palette-primary-main)',
      hover: {
        size: 6
      },
      radius: 4
    },
    stroke: {
      curve: 'smooth',
      width: [0, 3],
      lineCap: 'round'
    },
    legend: {
      show: true,
      position: 'bottom',
      markers: {
        width: 8,
        height: 8,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      height: 40,
      itemMargin: {
        horizontal: 10,
        vertical: 0
      },
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: 400,
      labels: {
        colors: 'var(--mui-palette-text-primary)'
      },
      offsetY: 10
    },
    grid: {
      strokeDashArray: 8,
      borderColor: 'var(--mui-palette-divider)'
    },
    colors: ['var(--mui-palette-warning-main)', 'var(--mui-palette-primary-main)'],
    fill: {
      opacity: [1, 1]
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      tickAmount: 10,
      categories: Object.keys(tardnessObj).sort((a, b) => b.localeCompare(a)),
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '13px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '13px',
          fontWeight: 400
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Grafik Keterlambatan'
        subheader='Total keterlambatan sekolah setiap bulan'
        action={<MonthButton selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}
      />
      <CardContent>
        <AppReactApexCharts
          id='shipment-statistics'
          type='line'
          height={310}
          width='100%'
          series={series}
          options={options}
        />
      </CardContent>
    </Card>
  )
}

export default StudentTardiness
