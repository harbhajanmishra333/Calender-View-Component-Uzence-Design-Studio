export const isSameDay = (a: Date, b: Date): boolean => (
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()
)

export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24
  const startMs = start.getTime()
  const endMs = end.getTime()
  return Math.floor((endMs - startMs) / msPerDay)
}

export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  const weekday = firstDay.getDay() // 0..6
  startDate.setDate(startDate.getDate() - weekday)
  const grid: Date[] = []
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }
  return grid
}
