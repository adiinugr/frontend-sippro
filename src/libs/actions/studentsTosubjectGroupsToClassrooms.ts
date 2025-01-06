'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function createStudentsSubjectGroupsToClassrooms(data: {
  classroomsToSubjectGroupId: number
  studentId: number
  classroomId: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/students-to-subject-groups-to-classroom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath(`/setting/subject-group/manage/${data.studentId}`, 'page')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteStudentsSubjectGroupsToClassrooms(data: {
  classroomsToSubjectGroupId: number
  studentId: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/students-to-subject-groups-to-classroom`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath(`/setting/subject-group/manage/${data.studentId}`, 'page')

    return res.json()
  } catch (error) {
    return error
  }
}

export { createStudentsSubjectGroupsToClassrooms, deleteStudentsSubjectGroupsToClassrooms }
