const convertDateToIsoString = (date: string) => {
  const [day, month, year] = date.split('/')

  const newDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  const convertedDate = newDate.toISOString()

  return convertedDate
}

export { convertDateToIsoString }
