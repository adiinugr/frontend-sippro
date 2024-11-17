// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import { Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

interface Props {
  control: any
  errors: any
}

const AddSubjectGroupForm = ({ control, errors }: Props) => {
  return (
    <Card>
      <CardHeader title='Data Kelompok Mapel' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Controller
              name='studyYear'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Tahun Pelajaran'
                  {...field}
                  error={Boolean(errors.studyYear)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Tahun Pelajaran</MenuItem>
                  <MenuItem value='2023-2024'>2023-2024</MenuItem>
                  <MenuItem value='2024-2025'>2024-2025</MenuItem>
                  <MenuItem value='2025-2026'>2025-2026</MenuItem>
                </CustomTextField>
              )}
            />
            {errors.studyYear && <FormHelperText error>This field is required.</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='grade'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Jenjang'
                  {...field}
                  error={Boolean(errors.grade)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Jenjang</MenuItem>
                  <MenuItem value='X'>X</MenuItem>
                  <MenuItem value='XI'>XI</MenuItem>
                  <MenuItem value='XII'>XII</MenuItem>
                </CustomTextField>
              )}
            />
            {errors.grade && <FormHelperText error>This field is required.</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Nama Kelompok Mapel'
                  placeholder='Matematika TL, Biologi, Kimia, Fisika'
                  {...(errors.name && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddSubjectGroupForm
