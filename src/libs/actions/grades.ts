'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchGrades() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/grade`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createGrade(data: { name: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/grade')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getGradeById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/grade/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateGrade(data: { name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/grade/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/grade')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteGradeById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/grade/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/setting/grade')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchGrades, createGrade, getGradeById, updateGrade, deleteGradeById }
