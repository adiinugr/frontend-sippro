'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Components Imports

// Types
import type { ViolationType } from '@/types/violationTypes'

// Utils
import { orderLessonYear } from '@/utils/lessonYear'

const ViolationLevel = ({ violationsData }: { violationsData?: ViolationType[] }) => {
  const mappedViolationsData = violationsData?.map(item => {
    return {
      name: item.student.name,
      classroom: orderLessonYear(item.student.stTSbgTc)[item.student.stTSbgTc.length - 1].clsrmsToSbjg.classroom.name,
      point: item.rule.point
    }
  })

  const organizedViolations = mappedViolationsData?.reduce((acc: any, { name, point, classroom }) => {
    acc[name] = acc[name] || { name, point: 0, classroom }
    acc[name].point += point
    acc[name].classroom = classroom

    return acc
  }, {})

  const violateStudent = Object.values(organizedViolations)

  const sortedViolateStudent = violateStudent.sort((a: any, b: any) => b.point - a.point)

  return (
    <Card className='bs-full'>
      <CardHeader title='Poin Pelanggaran' />
      <Divider />
      <div className='flex justify-between plb-4 pli-6'>
        <Typography className='uppercase'>Nama Siswa</Typography>
        <Typography className='uppercase'>Total Poin</Typography>
      </div>
      <Divider />
      <CardContent className='flex flex-col gap-4'>
        {sortedViolateStudent.slice(0, 4).map((item: any, i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='flex justify-between items-center is-full gap-4'>
              <div>
                <Typography className='font-medium' color='text.primary'>
                  {item.name}
                </Typography>
                <Typography variant='body2'>{item.classroom}</Typography>
              </div>
              <Typography className='font-medium' color='text.primary'>
                {item.point}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ViolationLevel
