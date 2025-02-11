const orderLessonYear = (array: any[]) => {
  return array.sort((a, b) =>
    a.clsrmsToSbjg.subjectGroup.lessonYear.name < b.clsrmsToSbjg.subjectGroup.lessonYear.name
      ? -1
      : Number(a.clsrmsToSbjg.subjectGroup.lessonYear.name < b.clsrmsToSbjg.subjectGroup.lessonYear.name)
  )
}

export { orderLessonYear }
