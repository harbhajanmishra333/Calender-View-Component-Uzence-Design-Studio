import React from 'react'
import { CalendarView } from './components/Calendar/CalendarView'
import { useEventManager } from './hooks/useEventManager'
import { SAMPLE_EVENTS } from './utils/constants'

export default function App() {
  const { events, add, update, remove } = useEventManager(SAMPLE_EVENTS)

  return (
    <div className="min-h-screen p-4 md:p-6 font-sans text-neutral-900 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Calendar Component</h1>
        <div className="bg-white rounded-xl shadow-card p-3 md:p-4">
          <CalendarView
            events={events}
            onEventAdd={add}
            onEventUpdate={update}
            onEventDelete={remove}
            initialView="month"
          />
        </div>
      </div>
    </div>
  )
}
