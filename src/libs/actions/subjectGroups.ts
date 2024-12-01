'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchSubjectGroups() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-group`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createSubjectGroup(data: { name: string; gradeId: number | string; lessonYearId: number | string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/subject-group/list')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getSubjectGroupById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-group/${id}`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateSubjectGroupById(
  data: { name: string; gradeId: number | string; lessonYearId: number | string },
  id: number
) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-group/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/setting/subject-group/list')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteSubjectGroupById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-group/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/setting/subject-group/list')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchSubjectGroups, createSubjectGroup, getSubjectGroupById, updateSubjectGroupById, deleteSubjectGroupById }
