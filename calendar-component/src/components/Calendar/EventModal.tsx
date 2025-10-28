import React, { useMemo, useState } from 'react'
import { Modal } from '../primitives/Modal'
import { Button } from '../primitives/Button'
import { Select } from '../primitives/Select'
import type { CalendarEvent } from './CalendarView.types'
import { EVENT_COLORS, EVENT_CATEGORIES } from '../../utils/constants'

interface EventModalProps {
  open: boolean
  initial?: Partial<CalendarEvent>
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete?: (id: string) => void
}

export const EventModal: React.FC<EventModalProps> = ({ open, initial, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [start, setStart] = useState<string>(() => initial?.startDate ? toLocalInput(initial.startDate) : '')
  const [end, setEnd] = useState<string>(() => initial?.endDate ? toLocalInput(initial.endDate) : '')
  const [color, setColor] = useState(initial?.color ?? '#0ea5e9')
  const [category, setCategory] = useState(initial?.category ?? '')
  const isEdit = Boolean(initial?.id)

  const isValid = useMemo(() => title.trim().length > 0 && start && end && new Date(start) < new Date(end), [title, start, end])

  return (
    <Modal open={open} onClose={onClose}>
      <h2 id="modal-title" className="text-lg font-semibold mb-2">{isEdit ? 'Edit' : 'Create'} Event</h2>
      <div id="modal-description" className="text-sm text-neutral-600 mb-4">{isEdit ? 'Update event details below' : 'Fill details to create a new event'}</div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} maxLength={100} className="w-full h-10 px-3 rounded-md border border-neutral-300" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} maxLength={500} className="w-full h-24 p-3 rounded-md border border-neutral-300" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Start</label>
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="w-full h-10 px-3 rounded-md border border-neutral-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End</label>
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="w-full h-10 px-3 rounded-md border border-neutral-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <div className="flex gap-2 flex-wrap">
            {EVENT_COLORS.map(c => (
              <button
                key={c}
                type="button"
                className={`w-8 h-8 rounded-md border-2 transition-all ${
                  color === c ? 'border-neutral-900 scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select
            value={category}
            onChange={e => setCategory(e.target.value)}
            options={[{ label: 'None', value: '' }, ...EVENT_CATEGORIES.map(cat => ({ label: cat, value: cat }))]}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        {isEdit ? (
          <Button variant="ghost" onClick={() => onDelete && initial?.id && onDelete(initial.id as string)}>Delete</Button>
        ) : <span />}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            if (!isValid) return
            const event: CalendarEvent = {
              id: (initial?.id as string) ?? `evt-${Date.now()}`,
              title: title.trim(),
              description: description.trim() || undefined,
              startDate: new Date(start),
              endDate: new Date(end),
              color,
              category: category.trim() || undefined
            }
            onSave(event)
          }}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}

function toLocalInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
