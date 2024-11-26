import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from "lodash-es"
import dayjs, { Dayjs } from "dayjs"

import type { CalendarData } from "@/components/calendar/types"


/**
 * 生成月历
 * @param currentDate 当前日期
 * @param actualMonth 实际月份
 * @returns 
 */
export const generateMonthCalendar = (currentDate: Dayjs, actualMonth?: Dayjs) => {
  const copyCurrentDate = cloneDeep(currentDate)
  // 当月第一天
  const firstDay = copyCurrentDate.startOf('month')
  // 当月最后一天
  const lastDay = copyCurrentDate.endOf('month')
  // 当月总天数
  const daysInMonth = copyCurrentDate.daysInMonth()
  // 第一天是周几
  const firstWeekday = firstDay.day()

  const calendar: CalendarData[] = []
  const addLength = firstWeekday === 0 ? 7 : firstWeekday
  // 补充上月日期
  for (let i = 1; i < addLength; i++) {
    const lastMonthDay = firstDay.subtract(firstWeekday - i, 'day')
    calendar.push({
      key: uuidv4(),
      dateDay: lastMonthDay.format('D'),
      isCurrentMonth: false,
      isToday: false,
      appendFlag: true
    })
  }

  // 添加当月日期
  for (let i = 0; i < daysInMonth; i++) {
    const currentDay = firstDay.add(i, 'day')
    calendar.push({
      key: uuidv4(),
      dateDay: currentDay.format('D'),
      isCurrentMonth: currentDay.isSame(actualMonth ?? dayjs(), 'month'),
      isToday: currentDay.isSame(dayjs(), 'day'),
      appendFlag: false
    })
  }
  const currentDays = daysInMonth + firstWeekday - 1

  // 如果当月日期不满42天，则补充下月日期
  if (currentDays < 42) {
    // 补充下月日期
    for (let i = currentDays + 1; i <= 42; i++) {
      const nextMonthDay = lastDay.add(i - currentDays, 'day')
      calendar.push({
        key: uuidv4(),
        dateDay: nextMonthDay.format('D'),
        isCurrentMonth: false,
        isToday: false,
        appendFlag: true
      })
    }

  }

  return calendar
}

/**
 * 生成周历
 * @param currentDate 当前日期
 * @returns 
 */
export const generateWeekCalendar = (currentDate: Dayjs) => {
  const copyCurrentDate = cloneDeep(currentDate)
  const firstDay = copyCurrentDate.startOf('week')

  const calendar: CalendarData[] = []
  for (let i = 0; i < 7; i++) {
    const currentDay = firstDay.add(i, 'day')
    calendar.push({
      key: uuidv4(),
      dateDay: currentDay.format('D'),
      isCurrentMonth: false,
      isToday: currentDay.isSame(dayjs(), 'day'),
      appendFlag: false
    })
  }
  return calendar
}

/**
 * 生成年历
 * @param currentDate 当前日期
 * @returns 
 */
export const generateYearCalendar = (currentDate: Dayjs) => {
  const copyCurrentDate = cloneDeep(currentDate)
  const firstMonth = copyCurrentDate.startOf('year')
  const calendaryear: CalendarData[][] = []
  for (let i = 0; i < 12; i++) {
    const currentMonth = firstMonth.add(i, 'month')
    const calendar = generateMonthCalendar(currentMonth, currentDate)
    calendaryear.push(calendar)
  }
  return calendaryear
}