'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import { Chip } from '@mui/material'

// Third Party
import { Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

interface Props {
  control: any
  errors: any
  lessonYearData: { id: number; name: string }[]
  gradeData: { id: number; name: string }[]
  selectedClassrooms: { id: number; name: string }[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const AddSubjectGroupForm = ({ control, errors, lessonYearData, gradeData, selectedClassrooms }: Props) => {
  return (
    <Card>
      <CardHeader title='Tambah Kelompok Mapel' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Controller
              name='lessonYearId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Tahun Pelajaran'
                  {...field}
                  error={Boolean(errors.lessonYearId)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Tahun Pelajaran</MenuItem>
                  {lessonYearData.map((data: { id: number; name: string }) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            {errors.lessonYearId && <FormHelperText error>Tahun Pelajaran harus diisi!</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='gradeId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Jenjang'
                  {...field}
                  error={Boolean(errors.gradeId)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value=''>Pilih Jenjang</MenuItem>
                  {gradeData.map((data: { id: number; name: string }) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            {errors.gradeId && <FormHelperText error>Jenjang harus diisi!</FormHelperText>}
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
                  {...(errors.name && { error: true, helperText: 'Nama Kelompok Mapel harus diisi!' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='classrooms'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Kelas'
                  {...field}
                  error={Boolean(errors.classrooms)}
                  SelectProps={{
                    multiple: true,
                    MenuProps,
                    renderValue: selected => (
                      <div className='flex flex-wrap gap-1'>
                        {(selected as unknown as string[]).map(value => (
                          <Chip key={value} label={value} size='small' />
                        ))}
                      </div>
                    )
                  }}
                >
                  {selectedClassrooms.map((data: { id: number; name: string }) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            {errors.classrooms && <FormHelperText error>Kelas harus diisi!</FormHelperText>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddSubjectGroupForm
