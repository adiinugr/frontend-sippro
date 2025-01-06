'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function createTeacherToRole(data: { teacherId: number; roleId: number }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teachers-to-roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/role')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteTeacherToRole(teacherId: number, roleId: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher-to-roles/${teacherId}/${roleId}`, {
      method: 'DELETE'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

export { createTeacherToRole, deleteTeacherToRole }
