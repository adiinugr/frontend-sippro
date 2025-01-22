'use client'

import type { KeyboardEvent } from 'react'

// MUI Import
import { Button, Grid, TextField, Typography, useMediaQuery } from '@mui/material'
import { useChat } from 'ai/react'

// Types
import type { Theme } from '@mui/material/styles'

// Third Party
import classnames from 'classnames'

import { toast } from 'react-toastify'

import type { StudentType } from '@/types/usersTypes'

// Components
import CustomIconButton from '@/@core/components/mui/IconButton'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { Markdown } from '@/views/user/student/chat-ai/Markdown'
import { useChatScroll } from '@/hooks/useScrollToBottom'

const optionPromps = [
  {
    id: 1,
    message: 'Jurusan dan universitas apa yang cocok dengan saya?'
  },
  {
    id: 2,
    message: 'Berikan saya rekomendasi universitas yang sesuai.'
  },
  {
    id: 3,
    message: 'Apa jurusan dengan prospek kerja yang bagus dalam 5 tahun ke depan?'
  },
  {
    id: 4,
    message: 'Adakah beasiswa S1 yang bisa saya peroleh?'
  }
]

type Props = {
  studentData: StudentType
}

function ChatAi({ studentData }: Props) {
  const marks = studentData.marks.map(mark => {
    const markArr = []

    markArr.push(
      `Nilai ${mark.subject.name} ${mark.semester} Tahun Pelajaran ${mark.subjectGroup.lessonYear.name} mendapat nilai ${mark.mark}`
    )

    return markArr
  })

  const achievements = studentData.achievements.map(achievement => {
    const achievementArr = []

    achievementArr.push(
      `${achievement.medal} ${achievement.category} ${achievement.title} tingkat ${achievement.level} yang diselenggarakan oleh ${achievement.organizer}`
    )

    return achievementArr
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, error, reload } = useChat({
    body: {
      mark: marks.join(', '),
      achievements: achievements.join(', '),
      studentName: studentData.name
    }
  })

  const ref = useChatScroll(messages)

  const submitForm = (e: any) => {
    handleSubmit(e)
  }

  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const handleInputEndAdornment = () => {
    return (
      <div className='flex items-center gap-1'>
        {isBelowSmScreen ? (
          <CustomIconButton disabled={isLoading} variant='contained' color='primary' type='submit'>
            <i className='tabler-send' />
          </CustomIconButton>
        ) : (
          <Button
            disabled={isLoading}
            variant='contained'
            color='primary'
            type='submit'
            endIcon={isLoading ? null : <i className='tabler-send' />}
          >
            {isLoading ? 'Generating...' : 'Send'}
          </Button>
        )}
      </div>
    )
  }

  return (
    <Grid container spacing={6} className='h-full place-content-center'>
      <Grid item xs={12} lg={11} xl={8} className='mx-auto '>
        <div>
          {messages.length > 0 ? (
            <div ref={ref} className='md:max-h-[380px] xl:max-h-[500px] overflow-y-scroll overflow-x-hidden'>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={classnames('flex gap-4 p-6', { 'flex-row-reverse': message?.role === 'user' })}
                >
                  {message.role === 'user' ? (
                    <CustomAvatar color='success' skin='light' size={32}>
                      <i className='tabler-user-circle' />
                    </CustomAvatar>
                  ) : (
                    <CustomAvatar size={32} skin='light' color='primary'>
                      <i className='tabler-brand-openai' />
                    </CustomAvatar>
                  )}

                  <div
                    className={classnames('flex flex-col gap-2', {
                      'items-end': message.role === 'user',
                      'max-is-[85%]': !isBelowMdScreen,
                      'max-is-[95%]': isBelowMdScreen && !isBelowSmScreen,
                      'max-is-[calc(100%-5.75rem)]': isBelowSmScreen
                    })}
                  >
                    <Markdown
                      className={classnames('pli-4 plb-2 shadow-xs', {
                        'bg-backgroundPaper rounded-e rounded-b': message.role !== 'user',
                        'bg-primary text-[var(--mui-palette-primary-contrastText)] rounded-s rounded-b':
                          message.role === 'user'
                      })}
                    >
                      {message.content as string}
                    </Markdown>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center mb-4 lg:mb-20'>
              <Typography variant='h5'>Selamat datang di Chatbot AI</Typography>
              <p>Di sini kamu bisa menanyakan apapun terkait rencanamu untuk studi lanjut.</p>
            </div>
          )}
          {error ? (
            <div className='mx-auto text-center mb-6'>
              Terjadi kesalahan pada AI. <span> </span>
              <button
                className='border-none bg-inherit text-primary cursor-pointer'
                style={{ font: 'inherit' }}
                onClick={() => reload()}
              >
                Silakan Coba Lagi
              </button>
            </div>
          ) : (
            <div className='p-6 grid grid-cols-1 md:grid-cols-4 gap-6'>
              {optionPromps.map(prompt => (
                <Button
                  key={prompt.id}
                  className='text-left justify-start text-sm'
                  variant='tonal'
                  color='primary'
                  onClick={() => append({ content: prompt.message, role: 'user' })}
                >
                  {prompt.message}
                </Button>
              ))}
            </div>
          )}

          <form autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder='Type a message'
              value={input}
              className='p-6'
              onChange={handleInputChange}
              sx={{
                '& fieldset': { border: '0' },
                '& .MuiOutlinedInput-root': {
                  background: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-customShadows-xs) !important'
                }
              }}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()

                  if (isLoading) {
                    toast.error('Please wait for the model to finish its response!')
                  } else {
                    submitForm(e)
                  }
                }
              }}
              size='small'
              InputProps={{ endAdornment: handleInputEndAdornment() }}
            />
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default ChatAi
