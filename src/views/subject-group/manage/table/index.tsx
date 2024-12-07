'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

// Type Imports

import UserStudentListTableDialog from '@/views/subject-group/manage/table/UserStudentListTableDialog'
import { fetchStudents } from '@/libs/actions/students'

// Component Imports

type Props = {
  rowSelection: any
  setRowSelection: (val: any) => void
}

const UserStudentListTable = ({ rowSelection, setRowSelection }: Props) => {
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const studentRes = await fetchStudents()

      setStudentData(studentRes.result)
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserStudentListTableDialog
          tableData={studentData}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </Grid>
    </Grid>
  )
}

export default UserStudentListTable
