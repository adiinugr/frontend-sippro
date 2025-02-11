// Type Imports

export type ClassroomType = {
  id: number
  name: string
  gradeId: number | string
  grade: { id: number; name: string }
  clsrmsToSbjgs: any[]
}

export type ManageClassroomType = {
  student: {
    id: number
    name: string
    nis: string
    nisn: string
  }
}
