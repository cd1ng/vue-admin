<script setup lang="ts">
import WeekTitle from './WeekTitle.vue';
import type { CalendarData, CalendarViewProps } from './types';

defineProps<CalendarViewProps>()

const renderBgColor = (item: CalendarData) => {
  return {
    'bg-blue-50 text-blue-600 font-medium': item.isToday,
    'hover:bg-gray-50 cursor-pointer': !item.isToday,
    'text-gray-400': !item.isCurrentMonth
  }
}
</script>

<template>
  <div class="bg-white border-r-[0.5rem] p-2">
    <WeekTitle class="mb-2" />
    <!-- 日期网格 -->
    <div class="grid grid-cols-7 gap-1">
      <div v-for="item in calendarData" :key="item.key"
        class="calendar-cell relative flex items-center justify-center rounded-md transition-colors"
        :class="renderBgColor(item)">
        <span class="calendar-date">{{ item.dateDay }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.calendar-cell {
  aspect-ratio: 1;
  font-size: 0.875rem;
  min-height: 2rem;
}

.calendar-date {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
}

/* 今天日期的特殊样式 */
:deep(.bg-blue-50) .calendar-date {
  background-color: rgb(59 130 246);
  color: white;
}
</style>
