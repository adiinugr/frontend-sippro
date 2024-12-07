// Type Imports

export type StudentType = {
  id: number
  name: string
  nis: string
  nisn: string
  email: string
  placeOfBirth: string
  dateOfBirth: string
  subjectGroupsToClassroomsToStudents: {
    classroom: {
      name: string
    }
  }[]
  role?: string
  nominationStatus?: string
  avatar?: string
}
