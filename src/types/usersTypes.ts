// Type Imports

import type { InputReportType } from '@/types/inputReportTypes'

export type StudentType = {
  id: number
  name: string
  nis: string
  nisn: string
  email: string
  placeOfBirth: string
  dateOfBirth: string
  achievements: {
    id: number
    title: string
    category: string
    medal: string
    level: string
    organizer: string
    date: string
  }[]
  stTSbgTc: {
    clsrmsToSbjg: {
      id: number
      classroom: {
        id: number
        name: string
      }
      subjectGroup: {
        id: number
        name: string
        gradeId: number
        lessonYear: {
          id: number
          name: string
        }
        sbjsToSbjgs: InputReportType[]
      }
    }
  }[]
  marks: {
    id: number
    name: string
    mark: number
    gradeId: number
    lessonYearId: number
    semester: string
    subject: {
      id: number
      name: string
    }
    subjectGroup: {
      id: number
      name: string
      lessonYear: {
        id: number
        name: string
      }
    }
  }[]
  role?: string
  nominationStatus?: string
  avatar?: string
}

export type TeacherType = {
  id: number
  name: string
  email: string
  placeOfBirth: string
  dateOfBirth: string
  avatar?: string
}
