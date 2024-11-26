<script setup lang="ts">
import WeekTitle from './WeekTitle.vue';
import type { CalendarData, CalendarViewProps } from './types';

const props = defineProps<CalendarViewProps>()

const renderBgColor = (item: CalendarData) => {
  return {
    'bg-blue-50 text-blue-600 font-medium': item.isToday,
    'hover:bg-gray-50 cursor-pointer': item.isCurrentMonth && !item.isToday,
    'text-gray-400': !item.isCurrentMonth && props.type === 'month',
    'text-gray-300': (!item.isCurrentMonth && props.type === 'year') || (!item.appendFlag && props.type === 'year'),
    'bg-transparent': props.type === 'year' && item.appendFlag
  }
}

const renderText = (item: CalendarData) => {
  if (props.type === 'month' || (props.type === 'year' && !item.appendFlag)) {
    return item.dateDay
  }
  return null
}
</script>

<template>
  <div class="calendar-month">
    <WeekTitle class="mb-2" />
    <!-- 日期网格 -->
    <div class="grid grid-cols-7 gap-1">
      <div v-for="item in calendarData" 
           :key="item.key"
           class="calendar-cell relative flex items-center justify-center rounded-md transition-colors"
           :class="renderBgColor(item)">
        <span class="calendar-date">{{ renderText(item) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-month {
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
}

.calendar-cell {
  aspect-ratio: 1;
  font-size: 0.875rem;
  min-height: 2rem;
}

@media (min-width: 1280px) {
  .calendar-cell {
    font-size: 1rem;
    min-height: 2.5rem;
  }
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