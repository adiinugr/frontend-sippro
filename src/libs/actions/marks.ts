'use server'

// import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchMarks() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/mark`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createMark(data: {
  studentId: number
  subjectId: number
  subjectGroupId: number
  semester: string
  mark: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function updateMark(data: { name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/mark/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteMarkById(studentId: number, subjectGroupId: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/mark/${studentId}/${subjectGroupId}`, {
      method: 'DELETE'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchMarks, createMark, updateMark, deleteMarkById }
