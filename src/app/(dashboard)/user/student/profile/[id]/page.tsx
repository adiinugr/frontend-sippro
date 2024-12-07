import { redirect } from 'next/navigation'

import { Grid } from '@mui/material'

import StudentLeft from '@/views/user/student/overview/student-left'
import StudentRight from '@/views/user/student/overview/student-right'
import { getStudentById } from '@/libs/actions/students'

const subjectProgresData = [
  { subjectName: 'Pendidikan Agama Islam', subjectCode: 'PAI', data: [78, 82, 89, 90, 91, 93] },
  { subjectName: 'Pendidikan Pancasila', subjectCode: 'PP', data: [88, 82, 89, 90, 91, 90] },
  { subjectName: 'Bahasa Indonesia', subjectCode: 'BIN', data: [78, 82, 83, 90, 91, 90] },
  { subjectName: 'Matematika', subjectCode: 'MAT', data: [78, 82, 82, 90, 93, 93] },
  { subjectName: 'Ilmu Pengetahuan Alam', subjectCode: 'IPA', data: [78, 82, 89, 85, 91, 93] },
  { subjectName: 'Ilmu Pengetahuan Sosial', subjectCode: 'IPS', data: [88, 82, 89, 90, 91, 93] },
  { subjectName: 'Bahasa Inggris', subjectCode: 'BING', data: [82, 82, 89, 87, 91, 90] },
  { subjectName: 'PJOK', subjectCode: 'PJOK', data: [78, 82, 89, 90, 91, 91] },
  { subjectName: 'Informatika', subjectCode: 'IFM', data: [78, 82, 83, 90, 91, 94] },
  { subjectName: 'Seni Budaya', subjectCode: 'SEN', data: [78, 81, 89, 89, 91, 95] }
]

const OverviewPage = async ({ params }: { params: { id: number } }) => {
  // Vars

  const data = await getStudentById(params.id)

  if (data.statusCode === 404) {
    redirect('/not-found')
  }

  console.log(data)

  return data ? (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <StudentLeft studentData={data.result} />
      </Grid>
      <Grid item xs={12} md={8}>
        <StudentRight subjectProgresData={subjectProgresData} />
      </Grid>
    </Grid>
  ) : null
}

export default OverviewPage
