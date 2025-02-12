// Type Imports

export type ClassroomType = {
  response: any
  id: number
  name: string
  gradeId: number | string
  grade: { id: number; name: string }
  clsrmsToSbjgs: any[]
}

export type CreateClassroomType = {
  response: any
  name: string
  gradeId: number | string
}

export type ManageClassroomType = {
  student: {
    id: number
    name: string
    nis: string
    nisn: string
  }
}
