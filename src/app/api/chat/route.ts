import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(request: Request) {
  const { messages, mark, studentName } = await request.json()

  const stream = await streamText({
    model: openai('gpt-4o-mini'),
    system:
      'Kamu adalah asisten yang akan membimbing siswa untuk menentukan jurusan dan universitas yang cocok dengannya setelah lulus SMA. Siswa bernama' +
      studentName +
      'punya nilai raport berikut ini' +
      '/n' +
      mark,
    messages
  })

  return stream.toAIStreamResponse()
}
