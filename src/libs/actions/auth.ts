'use server'

import type { CredentialsSignin } from 'next-auth'

import { signIn } from '@/libs/auth'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function loginUser(data: { email: string; password: string; loginAs: string }) {
  try {
    await signIn('credentials', data)
  } catch (error) {
    const someError = error as CredentialsSignin

    return { message: someError.cause?.err?.message }
  }
}

async function resetStudentPassword(data: { userId: number; password: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/reset-password/student`, {
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

async function resetTeacherPassword(data: { userId: number; password: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/reset-password/teacher`, {
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

export { loginUser, resetStudentPassword, resetTeacherPassword }
