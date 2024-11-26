<script setup lang="ts">
import { CalendarYearViewProps } from './types';

defineProps<CalendarYearViewProps>()
</script>

<template>
  <div class="grid grid-cols-4 gap-2 xl:gap-4">
    <div v-for="(item, index) in calendarData" :key="index">
      <MonthView :calendar-data="item" :type="type" />
    </div>
  </div>
</template>