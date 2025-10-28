import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarView } from './CalendarView'
import type { CalendarEvent } from './CalendarView.types'
import { useEventManager } from '@/hooks/useEventManager'
import { SAMPLE_EVENTS, EVENT_COLORS } from '@/utils/constants'

const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 bg-neutral-50 min-h-screen">{children}</div>
)

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <StoryWrapper><Story /></StoryWrapper>],
  argTypes: {
    initialView: { control: 'radio', options: ['month', 'week'] },
  }
}
export default meta

type Story = StoryObj<typeof CalendarView>

export const Default: Story = {
  args: {
    events: SAMPLE_EVENTS,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
    initialView: 'month',
    initialDate: new Date(2024, 0, 15)
  }
}

export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  }
}

export const WeekViewStory: Story = {
  name: 'Week View',
  args: {
    events: SAMPLE_EVENTS,
    initialView: 'week',
    initialDate: new Date(2024, 0, 15),
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  }
}

export const LargeDataset: Story = {
  args: {
    events: Array.from({ length: 28 }).map((_, i) => ({
      id: `evt-${i}`,
      title: `Event ${i+1}`,
      description: `Description for event ${i+1}`,
      startDate: new Date(2024, 0, (i % 28) + 1, (i % 12) + 8, 0),
      endDate: new Date(2024, 0, (i % 28) + 1, (i % 12) + 9, 30),
      color: EVENT_COLORS[i % EVENT_COLORS.length],
      category: ['Meeting', 'Design', 'Development', 'Personal'][i % 4]
    })),
    initialDate: new Date(2024, 0, 15),
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  }
}

// Interactive Playground: uses internal state to add/edit/delete
export const InteractivePlayground: Story = {
  render: (args) => {
    const { events, add, update, remove } = useEventManager(args.events as CalendarEvent[] ?? SAMPLE_EVENTS)
    return (
      <CalendarView
        events={events}
        onEventAdd={add}
        onEventUpdate={update}
        onEventDelete={remove}
        initialView={args.initialView}
        initialDate={args.initialDate}
      />
    )
  },
  args: {
    events: SAMPLE_EVENTS,
    initialView: 'month',
    initialDate: new Date(2024, 0, 15)
  }
}
