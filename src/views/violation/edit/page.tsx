'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { Divider, FormHelperText } from '@mui/material'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Actions
import { updateViolation } from '@/libs/actions/violations'
import { fetchRules } from '@/libs/actions/rules'

type Props = {
  violationId: number
  selectedData: any
}

type FormValues = {
  name: string
  violation: any
  table: number[]
  date: Date | null | undefined
}

const ViolationEdit = ({ violationId, selectedData }: Props) => {
  const { push } = useRouter()

  // States
  const [violationRuleData, setViolationRuleData] = useState<any[]>([])

  const autocompleteOptions = violationRuleData.map(option => {
    return {
      id: option.id,
      name: option.name,
      category: option.ruleCategory.name
    }
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const ruleData = await fetchRules()

      setViolationRuleData(ruleData.result)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: selectedData.student.name,
      violation: {
        id: selectedData.rule.id,
        name: selectedData.rule.name,
        category: selectedData.rule.ruleCategory.name
      },
      date: new Date(selectedData.date)
    }
  })

  useEffect(() => {
    reset({
      name: selectedData.student.name,
      violation: {
        id: selectedData.rule.id,
        name: selectedData.rule.name,
        category: selectedData.rule.ruleCategory.name
      },
      date: new Date(selectedData.date)
    })
  }, [
    reset,
    selectedData.date,
    selectedData.rule.id,
    selectedData.rule.name,
    selectedData.rule.ruleCategory.name,
    selectedData.student.name
  ])

  const onSubmit = async (data: FormValues) => {
    const { violation, date } = data

    const violationData = {
      studentId: selectedData.student.id,
      ruleId: violation.id,
      date: date?.toISOString() as string
    }

    setIsLoading(true)

    try {
      const updateViolationRes = await updateViolation(violationData, violationId)

      if (updateViolationRes.statusCode !== 200) {
        toast.error(`Gagal mengubah data pelanggaran! Silakan hubungi Admin!`)
        setIsLoading(false)

        return
      }

      toast.success(`Berhasil mengubah data pelanggaran!`)
      setIsLoading(false)

      push('/teacher/violation/list')
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal mengubah data! Silakan hubungi Admin!`)
    }
  }

  return (
    <Card>
      <CardHeader title='Input Data Pelanggaran' />
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled
                    label='Nama Siswa'
                    placeholder='John Doe'
                    {...(errors.name && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='violation'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <CustomAutocomplete
                    id='autocomplete-custom'
                    fullWidth
                    value={value}
                    options={autocompleteOptions.sort((a, b) => -b.category.localeCompare(a.category))}
                    onChange={(event, item) => {
                      onChange(item)
                    }}
                    groupBy={option => option.category}
                    getOptionLabel={option => option.name || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        error={Boolean(errors.violation)}
                        placeholder='Pelanggaran'
                        label='Jenis Pelanggaran'
                      />
                    )}
                  />
                )}
              />
              {errors.violation && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='DD/MM/YYYY'
                    customInput={
                      <CustomTextField
                        value={value}
                        onChange={onChange}
                        fullWidth
                        label='Tanggal Pelanggaran'
                        {...(errors.date && { error: true, helperText: 'This field is required.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button disabled={isLoading} variant='contained' type='submit'>
                {isLoading ? 'Loading...' : 'Simpan'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ViolationEdit
