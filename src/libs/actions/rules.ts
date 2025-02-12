'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface Rule {
  id: number
  name: string
  point: number
  ruleCategoryId: number
}

interface CreateRuleDto {
  name: string
  point: number
  ruleCategoryId: number
}

interface UpdateRuleDto {
  name: string
  point: number | string
  ruleCategoryId: number | string
}

// Constants
const RULES_PATH = '/rule'
const REVALIDATE_PATH = '/teacher/violation/rules'

// Actions
export async function fetchRules(): Promise<ApiResponse<Rule[]>> {
  return apiClient<Rule[]>(RULES_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createRule(data: CreateRuleDto): Promise<ApiResponse<any>> {
  return apiClient<Rule>(
    RULES_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getRuleById(id: number): Promise<ApiResponse<Rule>> {
  return apiClient<Rule>(`${RULES_PATH}/${id}`, {
    method: 'GET'
  })
}

export async function updateRule(id: number, data: UpdateRuleDto): Promise<ApiResponse<any>> {
  return apiClient<Rule>(
    `${RULES_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteRuleById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${RULES_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
