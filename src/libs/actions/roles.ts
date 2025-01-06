'use server'

import { revalidatePath } from 'next/cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchRoles() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/role`, {
      method: 'GET',
      cache: 'no-cache'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function createRole(data: { name: string }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/role')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function getRoleById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/role/${id}`, {
      method: 'GET'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

async function updateRole(data: { name: string }, id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/role/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    revalidatePath('/role')

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

async function deleteRoleById(id: number) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/role/${id}`, {
      method: 'DELETE'
    })

    revalidatePath('/role')

    return res.json()
  } catch (error) {
    return error
  }
}

export { fetchRoles, createRole, getRoleById, updateRole, deleteRoleById }
