import type { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { isSameDay } from "./date.utils";

export const eventsForDay = (events: CalendarEvent[], day: Date) =>
  events.filter(e => isSameDay(e.startDate, day))

export const sortEventsByStart = (events: CalendarEvent[]) =>
  [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
