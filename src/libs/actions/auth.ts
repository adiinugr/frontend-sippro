'use server'

// Libs
import type { CredentialsSignin } from 'next-auth'

// Libs
import { apiClient } from '@/libs/api/client'
import type { ApiResponse } from '@/libs/api/client'
import { signIn } from '@/libs/auth'

// Constants
const AUTH_PATH = '/auth/reset-password'

interface ResetPasswordDto {
  userId: number
  password: string
}

async function loginUser(data: { email: string; password: string; loginAs: string }) {
  try {
    await signIn('credentials', data)
  } catch (error) {
    const someError = error as CredentialsSignin

    return { message: someError.cause?.err?.message }
  }
}

async function resetStudentPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
  return apiClient(`${AUTH_PATH}/student`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

async function resetTeacherPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
  return apiClient(`${AUTH_PATH}/teacher`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

export { loginUser, resetStudentPassword, resetTeacherPassword }
