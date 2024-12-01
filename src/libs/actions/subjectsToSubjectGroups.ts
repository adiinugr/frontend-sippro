'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function createSubjectsToSubjectGroup(data: { subjectOrder: number; subjectId: number; subjectGroupId: number }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subjects-to-subject-group`, {
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

async function updateSubjectsToSubjectGroup(data: { code: string; name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subjects-to-subject-group/${id}`, {
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

async function deleteSubjectsToSubjectGroupById(subjectId: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subjects-to-subject-group/${subjectId}`, {
      method: 'DELETE'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

export { createSubjectsToSubjectGroup, updateSubjectsToSubjectGroup, deleteSubjectsToSubjectGroupById }
