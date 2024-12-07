'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function createSubjectGroupsToClassroomsToStudent(data: {
  subjectGroupId: number
  classroomId: number
  studentId: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-groups-to-classrooms-to-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath(`/setting/subject-group/manage/[id]`, 'page')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteSubjectGroupsToClassroomsToStudent(data: {
  subjectGroupId: number
  classroomId: number
  studentId: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/subject-groups-to-classrooms-to-student`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath(`/setting/subject-group/manage/[id]`, 'page')

    return res.json()
  } catch (error) {
    return error
  }
}

export { createSubjectGroupsToClassroomsToStudent, deleteSubjectGroupsToClassroomsToStudent }
