import { useCallback, useMemo, useState } from 'react'

type View = 'month' | 'week'

interface CalendarState {
  currentDate: Date
  view: View
  selectedDate: Date | null
}

export const useCalendar = (initialDate: Date = new Date(), initialView: View = 'month') => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
  })

  const goToNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.view === 'month'
        ? new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1, 1)
        : new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth(), prev.currentDate.getDate() + 7)
    }))
  }, [])

  const goToPrev = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.view === 'month'
        ? new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1, 1)
        : new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth(), prev.currentDate.getDate() - 7)
    }))
  }, [])

  const goToToday = useCallback(() => {
    setState(prev => ({ ...prev, currentDate: new Date() }))
  }, [])

  const setView = useCallback((view: View) => {
    setState(prev => ({ ...prev, view }))
  }, [])

  const title = useMemo(() => {
    const d = state.currentDate
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' })
  }, [state.currentDate])

  return { ...state, goToNext, goToPrev, goToToday, setView, title }
}
