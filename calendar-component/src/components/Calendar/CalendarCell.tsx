import React, { useCallback, useMemo } from 'react'
import type { CalendarEvent } from './CalendarView.types'

interface CalendarCellProps {
  date: Date
  inCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(({ date, inCurrentMonth, isToday, events, onDayClick, onEventClick }) => {
  const handleClick = useCallback(() => onDayClick(date), [onDayClick, date])
  const eventCount = useMemo(() => events.length, [events])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${date.toDateString()}. ${eventCount} events.`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      onClick={handleClick}
      className={`border border-neutral-200 h-24 md:h-32 p-1 md:p-2 cursor-pointer transition-colors ${inCurrentMonth ? 'bg-white hover:bg-neutral-50' : 'bg-neutral-50 text-neutral-400'}`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className={`text-sm font-medium ${inCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'}`}>{date.getDate()}</span>
        {isToday && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">{date.getDate()}</span>
        )}
      </div>
      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 3).map(ev => (
          <div
            key={ev.id}
            className="text-xs px-2 py-1 rounded truncate"
            style={{ backgroundColor: ev.color || '#e5e7eb' }}
            onClick={(e) => { e.stopPropagation(); onEventClick(ev) }}
          >
            {ev.title}
          </div>
        ))}
        {events.length > 3 && (
          <button className="text-xs text-primary-600 hover:underline" onClick={(e) => e.stopPropagation()}>+{events.length - 3} more</button>
        )}
      </div>
    </div>
  )
})
