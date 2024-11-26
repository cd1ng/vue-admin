<script setup lang="ts">
import WeekTitle from './WeekTitle.vue';
import type{ CalendarViewProps } from './types';

defineProps<CalendarViewProps>()
</script>

<template>
  <WeekTitle />

  <!-- 日期网格 -->
  <div class="grid grid-cols-7 gap-2 xl:gap-4">
    <div v-for="item in calendarData" :key="item.key + '_week'"
      class="aspect-square text-center flex items-center justify-center text-sm xl:text-base"
      :class="item.isToday ? 'bg-green-200' : 'bg-blue-200'">
      {{ item.dateDay }}
    </div>
  </div>
</template>
