export type SubjectGroupType = {
  id: number
  name: string
  lessonYearId: number
  gradeId: number
  lessonYear: {
    id: number
    name: string
  }
  grade: {
    id: number
    name: string
  }
  sbjsToSbjgs: {
    subjectOrder: number
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

export type SubjectGroupTableType = {
  id: number
  name: string
  lessonYear: string
  grade: string
  sbjsToSbjgs: any
  clsrmsToSbjgs: any
}
