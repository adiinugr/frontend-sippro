'use server'

import { revalidatePath } from 'next/cache'

import type { AddAchievementType } from '@/types/achievementTypes'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchAchievements() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/achievement`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createAchievements(data: {
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: string
  studentId: number
}) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/achievement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getAchievementById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/achievement/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateAchievement(data: AddAchievementType, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/achievement/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteAchievementById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/achievement/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchAchievements, createAchievements, getAchievementById, updateAchievement, deleteAchievementById }
