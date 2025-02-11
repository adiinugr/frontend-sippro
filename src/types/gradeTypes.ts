// Type Imports

export type GradeType = {
  id: number
  name: string
  classrooms: {
    name: string
  }[]
}

export type AddGradeType = {
  name: string
}
