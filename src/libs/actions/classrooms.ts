'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchClassrooms() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classroom`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createClassroom(data: { name: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classroom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/classroom')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getClassroomById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classroom/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateClassroom(data: { name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classroom/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/classroom')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteClassroomById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classroom/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/setting/classroom')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchClassrooms, createClassroom, getClassroomById, updateClassroom, deleteClassroomById }
