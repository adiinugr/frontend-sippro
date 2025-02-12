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

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Actions
import { createViolation } from '@/libs/actions/violations'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import { fetchRules } from '@/libs/actions/rules'
import ViolationAddStudentTable from '@/views/violation/add/table'

type FormValues = {
  violation: any
  table: number[]
  date: Date | null | undefined
}

const ViolationAdd = () => {
  const { push } = useRouter()

  // States
  const [violationRuleData, setViolationRuleData] = useState<any[]>([])

  const [rowSelection, setRowSelection] = useState({})

  const selectedStudentIds = Object.keys(rowSelection)

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

      setViolationRuleData(ruleData.result as any)
    }

    fetchData()
  }, [])

  // Hooks
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      violation: null,
      date: null,
      table: []
    }
  })

  useEffect(() => {
    if (selectedStudentIds?.length == 0) {
      setError('table', { type: 'custom', message: 'Pilih setidaknya satu siswa!' })
    } else {
      clearErrors('table')
    }
  }, [clearErrors, selectedStudentIds?.length, setError])

  const onSubmit = async (data: FormValues) => {
    const { violation, date } = data

    const violationData = {
      ruleId: violation.id,
      date: date?.toISOString() as string
    }

    setIsLoading(true)

    try {
      const createViolationPromise = await Promise.all(
        selectedStudentIds.map(async id => {
          const res = await createViolation({
            date: violationData.date,
            studentId: Number(id),
            ruleId: violationData.ruleId
          })

          return res
        })
      )

      const isResError = createViolationPromise.some(el => el.statusCode !== 201)

      if (isResError) {
        toast.error(`Gagal menambah data pelanggaran! Silakan hubungi Admin!`)
        setIsLoading(false)

        return
      }

      toast.success(`Berhasil menambah data pelanggaran!`)
      setIsLoading(false)

      push('/teacher/violation/list')
    } catch (error) {
      setIsLoading(false)

      toast.error(`Gagal menambahkan data! Silakan hubungi Admin!`)
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
                    // eslint-disable-next-line lines-around-comment
                    // dateFormat='DD/MM/YYYY'
                    maxDate={new Date()}
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
            <Grid item xs={12}>
              <ViolationAddStudentTable
                tableError={errors.table?.message || ''}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
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

export default ViolationAdd
