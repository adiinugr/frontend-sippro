// Type Imports

export type AchievementType = {
  id: number
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: string
}

export type AddAchievementType = {
  title: string
  category: string
  medal: string
  level: string
  organizer: string
  date: Date | null | undefined
}
