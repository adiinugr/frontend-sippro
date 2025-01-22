export type SubjectGroupType = {
  id: number
  name: string
  lessonYear: {
    id: number
    name: string
  }
  grade: {
    id: number
    name: string
  }
  sbjsToSbjgs: {
    subject: {
      id: number
      code: string
      name: string
    }
  }[]
  clsrmsToSbjgs: {
    id: number
    classroom: {
      id: number
      name: string
    }
    stdsToSbjgsToClsrms: {
      student: {
        id: number
        name: string
        nis: string
        nisn: string
        placeOfBirth: string
        dateOfBirth: string
        email: string
      }
    }[]
  }[]
}

export type SubjectGroupListType = {
  subjectOrder: number
  name: string
}
