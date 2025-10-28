import React, { useMemo } from 'react'
import type { CalendarEvent } from './CalendarView.types'
import { isSameDay } from '../../utils/date.utils'

interface WeekViewProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const HOUR_HEIGHT = 60 // pixels per hour

export const WeekView: React.FC<WeekViewProps> = ({ date, events, onEventClick }) => {
  const start = useMemo(() => {
    const d = new Date(date)
    d.setDate(d.getDate() - d.getDay())
    return d
  }, [date])

  const days = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
    [start]
  )

  const eventsByDay = useMemo(() => 
    days.map(day => events.filter(e => isSameDay(e.startDate, day))),
    [days, events]
  )

  return (
    <div className="flex overflow-auto">
      {/* Time labels column */}
      <div className="flex-shrink-0 w-16 pr-2 border-r border-neutral-200">
        <div className="h-12" /> {/* header spacer */}
        {HOURS.map(h => (
          <div key={h} className="text-xs text-neutral-500 text-right pr-2" style={{ height: HOUR_HEIGHT }}>
            {h.toString().padStart(2, '0')}:00
          </div>
        ))}
      </div>

      {/* Day columns */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day, dayIdx) => (
          <div key={day.toISOString()} className="border-r border-neutral-200 last:border-r-0">
            {/* Day header */}
            <div className="h-12 border-b border-neutral-200 px-2 flex items-center justify-center text-sm font-medium">
              {day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>

            {/* Time grid */}
            <div className="relative" style={{ height: HOURS.length * HOUR_HEIGHT }}>
              {/* Hour lines */}
              {HOURS.map(h => (
                <div key={h} className="absolute inset-x-0 border-t border-neutral-100" style={{ top: h * HOUR_HEIGHT }} />
              ))}

              {/* Events */}
              {eventsByDay[dayIdx].map(evt => {
                const startHour = evt.startDate.getHours() + evt.startDate.getMinutes() / 60
                const endHour = evt.endDate.getHours() + evt.endDate.getMinutes() / 60
                const top = startHour * HOUR_HEIGHT
                const height = (endHour - startHour) * HOUR_HEIGHT
                return (
                  <div
                    key={evt.id}
                    className="absolute inset-x-1 rounded px-2 py-1 text-xs cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                    style={{ top, height, backgroundColor: evt.color || '#e5e7eb' }}
                    onClick={() => onEventClick?.(evt)}
                  >
                    <div className="font-medium truncate">{evt.title}</div>
                    <div className="text-xs opacity-75 truncate">{evt.description}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
