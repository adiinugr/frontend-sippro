// Type Imports

export type ClassroomType = {
  name: string
  gradeId: number | string
}

export type ManageClassroomType = {
  classroom: {
    id: number
    name: string
  }
  student: {
    id: number
    name: string
    nis: string
    nisn: string
  }
}
