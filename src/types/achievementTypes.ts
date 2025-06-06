// Type Imports

export type AchievementType = {
  id: number
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: string
  studentId: number
}

export type AddAchievementType = {
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: Date | null | undefined
  studentId: number
}

export type CreateAchievementType = {
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: string
  studentId: number
}
