const sortedClassroomArray = (array: any[]) => {
  return array.sort((a, b) =>
    a.classroomToSubjectGroup.classroom.name.localeCompare(b.classroomToSubjectGroup.classroom.name)
  )
}

export { sortedClassroomArray }
