'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchLessonYears() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lesson-year`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createLessonYear(data: { name: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lesson-year`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/study-year')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getLessonYearById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lesson-year/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateLessonYear(data: { name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lesson-year/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/study-year')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteLessonYearById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lesson-year/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/setting/study-year')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchLessonYears, createLessonYear, getLessonYearById, updateLessonYear, deleteLessonYearById }
