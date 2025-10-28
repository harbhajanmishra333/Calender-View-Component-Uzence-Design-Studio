import { useCallback, useState } from 'react'
import type { CalendarEvent } from '../components/Calendar/CalendarView.types'

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initial)

  const add = useCallback((e: CalendarEvent) => setEvents(prev => [...prev, e]), [])
  const update = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  }, [])
  const remove = useCallback((id: string) => setEvents(prev => prev.filter(e => e.id !== id)), [])

  return { events, add, update, remove }
}
