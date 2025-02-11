'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TeacherListTableDialog from '@/views/roles/dialog-table/TeacherListTableDialog'

// Actions
import { fetchTeachers } from '@/libs/actions/teachers'

type Props = {
  rowSelection: any
  setRowSelection: (val: any) => void
}

const TeacherDialog = ({ rowSelection, setRowSelection }: Props) => {
  const [teacherData, setTeacherData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const teacherRes = await fetchTeachers()

      setTeacherData(teacherRes.result)
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TeacherListTableDialog tableData={teacherData} rowSelection={rowSelection} setRowSelection={setRowSelection} />
      </Grid>
    </Grid>
  )
}

export default TeacherDialog
