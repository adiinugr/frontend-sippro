'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
import type { AchievementType, AddAchievementType } from '@/types/achievementTypes'

// Constants
const ACHIEVEMENTS_PATH = '/achievement'
const REVALIDATE_PATH = '/'

// Actions
async function fetchAchievements(): Promise<ApiResponse<AchievementType[]>> {
  return apiClient<AchievementType[]>(ACHIEVEMENTS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

async function createAchievements(data: AchievementType): Promise<ApiResponse<AchievementType>> {
  return apiClient<AchievementType>(
    ACHIEVEMENTS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function getAchievementById(id: number): Promise<ApiResponse<AchievementType>> {
  return apiClient<AchievementType>(`${ACHIEVEMENTS_PATH}/${id}`, {
    method: 'GET'
  })
}

async function updateAchievement(id: number, data: AddAchievementType): Promise<ApiResponse<AchievementType>> {
  return apiClient<AchievementType>(
    `${ACHIEVEMENTS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

async function deleteAchievementById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${ACHIEVEMENTS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}

export { fetchAchievements, createAchievements, getAchievementById, updateAchievement, deleteAchievementById }
