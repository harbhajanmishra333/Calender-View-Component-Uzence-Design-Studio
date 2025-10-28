import React, { Suspense, useCallback, useState } from 'react'
import type { CalendarEvent, CalendarViewProps } from './CalendarView.types'
import { useCalendar } from '../../hooks/useCalendar'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { Button } from '../primitives/Button'
import { EventModal } from './EventModal'

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const { currentDate, view, setView, title, goToNext, goToPrev, goToToday } = useCalendar(initialDate, initialView)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Partial<CalendarEvent> | undefined>(undefined)

  const onDayClick = useCallback((date: Date) => {
    setDraft({ startDate: date, endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1) })
    setModalOpen(true)
  }, [])

  const onEventClick = useCallback((event: CalendarEvent) => {
    setDraft(event)
    setModalOpen(true)
  }, [])

  const handleSave = useCallback((evt: CalendarEvent) => {
    if (draft?.id) onEventUpdate(draft.id, evt)
    else onEventAdd(evt)
    setModalOpen(false)
  }, [draft, onEventAdd, onEventUpdate])

  const handleDelete = useCallback((id: string) => {
    onEventDelete(id)
    setModalOpen(false)
  }, [onEventDelete])

  const nav = (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={goToPrev}>Prev</Button>
        <Button variant="secondary" size="sm" onClick={goToToday}>Today</Button>
        <Button variant="secondary" size="sm" onClick={goToNext}>Next</Button>
      </div>
      <div className="text-lg md:text-xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        <Button variant={view === 'month' ? 'primary' : 'secondary'} size="sm" onClick={() => setView('month')}>Month</Button>
        <Button variant={view === 'week' ? 'primary' : 'secondary'} size="sm" onClick={() => setView('week')}>Week</Button>
      </div>
    </div>
  )

  return (
    <div>
      {nav}
      <Suspense>
        {view === 'month' ? (
          <MonthView date={currentDate} events={events} onDayClick={onDayClick} onEventClick={onEventClick} />
        ) : (
          <WeekView date={currentDate} events={events} onEventClick={onEventClick} />
        )}
      </Suspense>

      <EventModal
        open={modalOpen}
        initial={draft}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={draft?.id ? handleDelete : undefined}
      />
    </div>
  )
}
