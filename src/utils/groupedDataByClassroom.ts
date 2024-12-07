type ClassroomData = {
  classroom: {
    name: string
  }
  student: {
    name: string
  }
}

const groupedDataByClassroom = (classroomData: ClassroomData[]) => {
  const newClassroomData = Object.entries(
    classroomData.reduce((acc: any, { classroom, student }) => {
      if (!acc[classroom.name]) {
        acc[classroom.name] = []
      }

      acc[classroom.name].push({ classroom, student })

      return acc
    }, {})
  ).map(([classroom, data]) => ({ classroom, data }))

  return newClassroomData
}

export { groupedDataByClassroom }
