// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components
import ViolationAdd from '@/views/violation/add'

// Libs & Actions
import { auth } from '@/libs/auth'

// Types
import type { Session } from '@/types/auth'

export default async function ViolationAddPage() {
  const session = (await auth()) as Session | null

  if (!session || session.user.status !== 'teacher') {
    redirect('/dashboard')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ViolationAdd />
      </Grid>
    </Grid>
  )
}
