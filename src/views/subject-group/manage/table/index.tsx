'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserStudentListTableDialog from '@/views/subject-group/manage/table/UserStudentListTableDialog'

// Actions
import { fetchStudents } from '@/libs/actions/students'

type Props = {
  rowSelection: any
  setRowSelection: (val: any) => void
}

const UserStudentManageListTable = ({ rowSelection, setRowSelection }: Props) => {
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
        <UserStudentListTableDialog
          tableData={studentData}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </Grid>
    </Grid>
  )
}

export default UserStudentManageListTable
