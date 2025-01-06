export type InputReportType = {
  subjectOrder: number
  subject: {
    id: number
    code: string
    name: string
  }
  subjectGroupId: number
  subjectId: number
  smt1: string
  smt2: string
}
