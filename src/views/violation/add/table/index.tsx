'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import { Typography } from '@mui/material'

import UserStudentListTable from './UserStudentListTable'

// Actions
import { fetchStudents } from '@/libs/actions/students'

type Props = {
  tableError: string
  rowSelection: any
  setRowSelection: (val: any) => void
}

const ViolationAddStudentTable = ({ tableError, rowSelection, setRowSelection }: Props) => {
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const studentRes = await fetchStudents()

      setStudentData(studentRes.result as any)
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='body2' className={`font-medium mb-2 ${tableError && 'text-red-400'}`}>
          Siswa Pelanggar
        </Typography>
        <UserStudentListTable
          tableError={tableError}
          tableData={studentData}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
        {tableError && (
          <Typography variant='body2' className={`font-medium mt-1 text-red-400`}>
            {tableError}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default ViolationAddStudentTable
