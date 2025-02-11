'use server'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'

// Types
interface RuleCategory {
  id: number
  name: string
}

interface CreateRuleCategoryDto {
  name: string
}

// Constants
const RULE_CATEGORIES_PATH = '/rule-category'
const REVALIDATE_PATH = '/teacher/violation/category'

// Actions
export async function fetchRuleCategories(): Promise<ApiResponse<RuleCategory[]>> {
  return apiClient<RuleCategory[]>(RULE_CATEGORIES_PATH, {
    method: 'GET',
    cache: 'no-cache'
  })
}

export async function createRuleCategory(data: CreateRuleCategoryDto): Promise<ApiResponse<RuleCategory>> {
  return apiClient<RuleCategory>(
    RULE_CATEGORIES_PATH,
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function getRuleCategoryById(id: number): Promise<ApiResponse<RuleCategory>> {
  return apiClient<RuleCategory>(`${RULE_CATEGORIES_PATH}/${id}`, {
    method: 'GET'
  })
}

export async function updateRuleCategory(id: number, data: CreateRuleCategoryDto): Promise<ApiResponse<RuleCategory>> {
  return apiClient<RuleCategory>(
    `${RULE_CATEGORIES_PATH}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    },
    REVALIDATE_PATH
  )
}

export async function deleteRuleCategoryById(id: number): Promise<ApiResponse<void>> {
  return apiClient(
    `${RULE_CATEGORIES_PATH}/${id}`,
    {
      method: 'DELETE'
    },
    REVALIDATE_PATH
  )
}
