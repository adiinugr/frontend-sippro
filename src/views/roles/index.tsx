// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Type Imports
import type { RoleType, TeacherWithRolesType } from '@/types/roleTypes'

// Component Imports
import RoleCards from './RoleCards'
import RolesTable from './RolesTable'

const Roles = ({ userData, roles }: { userData?: TeacherWithRolesType[]; roles?: RoleType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
        <Typography>
          Sebuah peran memberikan akses ke menu dan fitur yang telah ditentukan sehingga berdasarkan peran yang
          diberikan, seorang administrator dapat mengakses apa yang dibutuhkan
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RoleCards tableData={roles} />
      </Grid>
      <Grid item xs={12} className='!pbs-12'>
        <Typography variant='h4' className='mbe-1'>
          Total pengguna dengan peran mereka
        </Typography>
        <Typography>Temukan semua akun administrator perusahaan Anda dan peran yang terkait</Typography>
      </Grid>
      <Grid item xs={12}>
        <RolesTable tableData={userData} roles={roles} />
      </Grid>
    </Grid>
  )
}

export default Roles
