<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import MonthView from './MonthView.vue';
import WeekView from './WeekView.vue';
import YearView from './YearView.vue';
import { generateMonthCalendar, generateWeekCalendar, generateYearCalendar } from '@/utils/calendar';

import type { CalendarData, SelectType, CalendarViewData } from './types';

const viewTypes = ['year', 'month', 'week'] as SelectType[]

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

// 年份选择弹窗控制
const yearDialogVisible = ref(false)

// 处理年份选择
// const handleYearSelect = (date: Date) => {
//   calenderState.value.currentDate = dayjs(date)
//   calenderState.value.type = 'month'
//   yearDialogVisible.value = false
// }

// 修改视图切换逻辑
const handleViewChange = (type: SelectType) => {
  if (type === 'year') {
    yearDialogVisible.value = true
  } else {
    calenderState.value.type = type
  }
}

</script>

<template>
  <div class="calendar-container">
    <!-- 头部控制区 -->
    <div class="mb-4">
      <!-- 视图切换按钮组 -->
      <div class="flex gap-2 mb-4">
        <button v-for="type in viewTypes" :key="type" class="px-4 py-2 rounded-md transition-colors"
          :class="calenderState.type === type ?
            'bg-blue-500 text-white' :
            'bg-gray-100 hover:bg-gray-200 text-gray-700'" @click="handleViewChange(type)">
          {{ type === 'year' ? '年' : type === 'month' ? '月' : '周' }}
        </button>
      </div>

      <!-- 日期导航 -->
      <div class="flex items-center justify-between px-2">
        <button class="p-2 hover:bg-gray-100 rounded-full" @click="handleDateChange(-1)">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="text-lg font-medium">
          {{ calenderState.currentDate.format('YYYY年MM月DD日') }}
        </span>
        <button class="p-2 hover:bg-gray-100 rounded-full" @click="handleDateChange(1)">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 日历视图区域 -->
    <div class="calendar-view">
      <MonthView v-if="calenderState.type === 'month'" :calendar-data="CalendarData.month"
        :type="calenderState.type" />
      <WeekView v-else :calendar-data="CalendarData.week" :type="calenderState.type" />
    </div>

    <!-- 年份选择弹窗 -->
    <YearView 
      v-if="yearDialogVisible"
      v-model="yearDialogVisible"
      :calendar-data="CalendarData.year" 
      :type="'year'"
      @close="yearDialogVisible = false"
    />
    <!-- <YearView 
      v-if="yearDialogVisible"
      v-model="yearDialogVisible"
      :calendar-data="CalendarData.year" 
      :type="'year'"
      @close="yearDialogVisible = false"
      @select="handleYearSelect"
    /> -->
  </div>
</template>

<style scoped>
.calendar-container {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
}

.calendar-view {
  height: calc(100% - 7rem);
  overflow: auto;
}
</style>
