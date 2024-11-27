import { Grid } from '@mui/material'

import ReportBarChart from '@/views/user/student/overview/ReportBarChart'
import SubjectLineChart from '@/views/user/student/overview/SubjectLineChart'

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

const OverviewPage = () => {
  // Vars

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ReportBarChart />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          {subjectProgresData.map(data => (
            <Grid key={data.subjectCode} item xs={12} sm={6} md={3} xl={6}>
              <SubjectLineChart data={data} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OverviewPage
