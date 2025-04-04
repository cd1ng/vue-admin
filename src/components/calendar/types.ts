export type SelectType = 'year' | 'month' | 'week'

export type CalendarViewData = {
  month: CalendarData[]
  week: CalendarData[]
  year: CalendarData[][]
}

export type CalendarData = {
  key: string
  dateDay: string
  isCurrentMonth: boolean
  isToday: boolean
  appendFlag: boolean
}

export type CalendarViewProps = {
  type: SelectType
  calendarData: CalendarData[]
}

export interface CalendarYearViewProps {
  modelValue: boolean
  calendarData: CalendarData[][]
  type: SelectType
}
