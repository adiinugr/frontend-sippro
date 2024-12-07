'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

type studentPayload = {
  email: string

  // Identity
  name: string
  nis: string
  nisn: string
  placeOfBirth: string
  dateOfBirth: Date | null | undefined | string
}

async function fetchStudents() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/student`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createStudent(data: studentPayload & { password: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/user/student')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getStudentById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/student/${id}`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateStudentById(data: studentPayload, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/student/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/user/student')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteStudentById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/student/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/user/student')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchStudents, createStudent, getStudentById, updateStudentById, deleteStudentById }
