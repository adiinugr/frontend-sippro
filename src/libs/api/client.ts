// Base API client with error handling and type safety
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export type ApiResponse<T = any> = {
  statusCode: number
  message?: string
  result?: T
  error?: string
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    throw new ApiError(response.status, `API error: ${response.status}`)
  }

  return response.json()
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
  revalidatePath?: string
): Promise<ApiResponse<T>> {
  try {
    const url = `${NEXT_PUBLIC_API_URL}${endpoint}`

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders
    })

    const data = await handleResponse<T>(response)

    if (revalidatePath) {
      // Import dynamically to avoid server/client mismatch
      const { revalidatePath: revalidate } = await import('next/cache')

      revalidate(revalidatePath)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        statusCode: error.statusCode,
        error: error.message
      }
    }

    return {
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
