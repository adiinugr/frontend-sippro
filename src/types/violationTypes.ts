// Type Imports

export type ViolationType = {
  id: number
  date: string
  student: {
    id: number
    name: string
    nis: string
    nisn: string
    stTSbgTc: {
      clsrmsToSbjg: {
        subjectGroup: {
          lessonYear: {
            id: number
            name: string
          }
        }
        classroom: {
          id: number
          name: string
        }
      }
    }[]
  }
  ruleId: number
  rule: {
    id: number
    name: string
    point: number
  }
}
