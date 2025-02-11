'use server'

import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
import type { ViolationType } from '@/types/violationTypes'

export interface CreateViolationDto {
  date: string
  studentId: number
  ruleId: number | null
}

// Constants
const VIOLATIONS_PATH = '/violation'
const REVALIDATE_PATH = '/teacher/violation/list'

// Actions
export async function fetchViolations() {
  return apiClient<ViolationType[]>(VIOLATIONS_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createViolation(data: CreateViolationDto): Promise<ApiResponse<ViolationType>> {
  return apiClient<ViolationType>(
    VIOLATIONS_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getViolationById(id: number): Promise<ApiResponse<ViolationType>> {
  return apiClient<ViolationType>(`${VIOLATIONS_PATH}/${id}`, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function updateViolation(id: number, data: CreateViolationDto): Promise<ApiResponse<ViolationType>> {
  return apiClient<ViolationType>(
    `${VIOLATIONS_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteViolationById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${VIOLATIONS_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
