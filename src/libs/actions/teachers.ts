'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

type teacherPayload = {
  email: string

  // Identity
  name: string
  placeOfBirth: string
  dateOfBirth: Date | null | undefined | string
}

async function fetchTeachers() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createTeacher(data: teacherPayload & { password: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/user/teacher')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getTeacherById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher/${id}`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateTeacherById(data: teacherPayload, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/user/teacher')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteTeacherById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/teacher/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/user/teacher')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchTeachers, createTeacher, getTeacherById, updateTeacherById, deleteTeacherById }
