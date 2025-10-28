import React, { useMemo } from 'react'
import { getCalendarGrid, isSameDay } from '../../utils/date.utils'
import type { CalendarEvent } from './CalendarView.types'
import { eventsForDay } from '../../utils/event.utils'
import { CalendarCell } from './CalendarCell'

interface MonthViewProps {
  date: Date
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthView: React.FC<MonthViewProps> = ({ date, events, onDayClick, onEventClick }) => {
  const grid = useMemo(() => getCalendarGrid(date), [date])
  const month = date.getMonth()
  const today = new Date()

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 mb-px">
        {WEEKDAYS.map(day => (
          <div key={day} className="bg-neutral-100 text-center py-2 text-sm font-medium text-neutral-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200">
        {grid.map((d) => (
          <CalendarCell
            key={d.toISOString()}
            date={d}
            inCurrentMonth={d.getMonth() === month}
            isToday={isSameDay(d, today)}
            events={eventsForDay(events, d)}
            onDayClick={onDayClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}
