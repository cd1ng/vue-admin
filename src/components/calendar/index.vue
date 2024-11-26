<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import MonthView from './MonthView.vue';
import WeekView from './WeekView.vue';
import YearView from './YearView.vue';
import { generateMonthCalendar, generateWeekCalendar, generateYearCalendar } from '@/utils/calendar';

import type { CalendarData, SelectType, CalendarViewData } from './types';

const calenderState = ref<{ currentDate: Dayjs, type: SelectType, selectDate: Dayjs }>({
  currentDate: dayjs(),
  type: 'month',
  // 默认选中日期为今天
  selectDate: dayjs()
})

const CalendarData = computed<CalendarViewData>(() => {
  const monthData = generateMonthCalendar(calenderState.value.currentDate)
  const weekData = generateWeekCalendar(calenderState.value.currentDate)
  const yearData = generateYearCalendar(calenderState.value.currentDate)
  return {
    month: monthData,
    week: weekData,
    year: yearData
  }
})


// 处理日期切换
const handleDateChange = (delta: 1 | -1) => {
  const { type, currentDate } = calenderState.value
  switch (type) {
    case 'year':
      calenderState.value.currentDate = currentDate.add(delta, 'year')
      break
    case 'month':
      calenderState.value.currentDate = currentDate.add(delta, 'month')
      break
    case 'week':
      calenderState.value.currentDate = currentDate.add(delta, 'week')
      break
  }
}

</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex gap-2 max-w-full md:max-w-2xl xl:max-w-4xl mx-auto select-none">
      <button class="border-2"
        :class="calenderState.type === 'year' ? ' border-green-200 dark:border-gray-100' : ' border-red-200 dark:border-gray-100'"
        @click="calenderState.type = 'year'">年</button>
      <button class="border-2"
        :class="calenderState.type === 'month' ? ' border-green-200 dark:border-gray-100' : ' border-red-200 dark:border-gray-100'"
        @click="calenderState.type = 'month'">月</button>
      <button class="border-2"
        :class="calenderState.type === 'week' ? ' border-green-200 dark:border-gray-100' : ' border-red-200 dark:border-gray-100'"
        @click="calenderState.type = 'week'">周</button>
    </div>

    <p class="flex max-w-full md:max-w-2xl xl:max-w-4xl mx-auto select-none">
      <button @click="handleDateChange(-1)">&lt;</button>
      {{ calenderState.currentDate.format('YYYY年MM月DD日') }}
      <button @click="handleDateChange(1)">&gt;</button>
    </p>
    <div class="max-w-full md:max-w-2xl xl:max-w-4xl mx-auto select-none">
      <!-- 分别渲染不同视图 -->
      <YearView v-if="calenderState.type === 'year'" :calendar-data="CalendarData.year" :type="calenderState.type" />
      <MonthView v-else-if="calenderState.type === 'month'" :calendar-data="CalendarData.month"
        :type="calenderState.type" />
      <WeekView v-else="calenderState.type === 'week'" :calendar-data="CalendarData.week" :type="calenderState.type" />
    </div>
  </div>
</template>
