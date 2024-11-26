<script setup lang="ts">
import WeekTitle from './WeekTitle.vue';

import type{ CalendarData,CalendarViewProps } from './types';

const props = defineProps<CalendarViewProps>()

const renderBgColor = (item: CalendarData) => {
  // 返回一个对象而不是字符串,不然不生效
  return {
    'bg-green-200': item.isToday,
    'bg-red-100': !item.isToday && item.isCurrentMonth,
    'bg-blue-200': (!item.isCurrentMonth && props.type === 'month')||(!item.appendFlag&&props.type==='year'),
    'bg-white': props.type === 'year' && item.appendFlag
  }
}

const renderText = (item: CalendarData) => {
  if (props.type === 'month'||props.type==='year'&&!item.appendFlag) {
    return item.dateDay
  }
  return null
}
</script>

<template>
  <WeekTitle />
  <!-- 日期网格 -->
  <div class="grid grid-cols-7 gap-2 xl:gap-4">
    <div v-for="item in calendarData" :key="item.key"
      class="aspect-square text-center flex items-center justify-center text-sm xl:text-base"
      :class="renderBgColor(item)">
      {{ renderText(item) }}
    </div>
  </div>
</template>