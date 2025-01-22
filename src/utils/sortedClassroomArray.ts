const sortedClassroomArray = (array: any[]) => {
  return array.sort((a, b) => a.classroom.name.localeCompare(b.classroom.name))
}

export { sortedClassroomArray }
