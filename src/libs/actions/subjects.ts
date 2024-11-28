'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchSubjects() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createSubject(data: { name: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/subject')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getSubjectById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateSubject(data: { code: string; name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/subject')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteSubjectById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/setting/subject')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchSubjects, createSubject, getSubjectById, updateSubject, deleteSubjectById }
