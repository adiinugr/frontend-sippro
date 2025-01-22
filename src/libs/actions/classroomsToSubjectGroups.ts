'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function createClasroomsToSubjectGroup(data: { classroomId: number; subjectGroupId: number }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classrooms-to-subject-group`, {
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

async function getClasroomsToSubjectGroup(data: { classroomId: number; subjectGroupId: number }) {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/classrooms-to-subject-group/${data.classroomId}/${data.subjectGroupId}`,
      {
        method: 'GET'
      }
    )

    revalidatePath('/setting/subject-group/list')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteClassroomsToSubjectGroupById(subjectGroupId: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classrooms-to-subject-group/${subjectGroupId}`, {
      method: 'DELETE'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function deleteClassroomsToSubjectGroupByClassroomsId(classroomId: number, subjectGroupId: number) {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/classrooms-to-subject-group/delete-by-classroom-id/${classroomId}/${subjectGroupId}`,
      {
        method: 'DELETE'
      }
    )

    return res.json()
  } catch (error) {
    return error
  }
}

export {
  createClasroomsToSubjectGroup,
  getClasroomsToSubjectGroup,

  // updateClassroomsToSubjectGroup,
  deleteClassroomsToSubjectGroupById,
  deleteClassroomsToSubjectGroupByClassroomsId
}
