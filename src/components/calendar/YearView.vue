<script setup lang="ts">
import MonthView from './MonthView.vue';
import { CalendarYearViewProps } from './types';

withDefaults(defineProps<CalendarYearViewProps>(), {
  modelValue: false
});

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', month: number): void
}>()

const monthTitles = [
  '一月', '二月', '三月', '四月',
  '五月', '六月', '七月', '八月',
  '九月', '十月', '十一月', '十二月'
];

// 选择月份
const handleMonthSelect = (month: number) => {
  emit('select', month)
}
</script>

<template>
  <ElDialog :model-value="modelValue" title="年历" width="80%" @close="emit('close')">
    <div class="max-h-[70vh] overflow-y-auto custom-scrollbar">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(item, index) in calendarData" :key="index"
          class="month-card hover:shadow-md transition-shadow cursor-pointer" @click="handleMonthSelect(index)">
          <h3 class="month-title">{{ monthTitles[index] }}</h3>
          <MonthView :calendar-data="item" :type="type" class="compact-month-view" />
        </div>
      </div>
    </div>
  </ElDialog>
</template>

<style scoped>
.month-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
}

.month-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
  margin-bottom: 0.5rem;
}

/* 紧凑型月历样式 */
:deep(.compact-month-view) {
  .calendar-cell {
    min-height: 1.5rem;
    font-size: 0.75rem;
  }

  .calendar-date {
    width: 1.25rem;
    height: 1.25rem;
  }

  .text-sm {
    font-size: 0.75rem;
  }

  .gap-1 {
    gap: 1px;
  }

  .calendar-month {
    padding: 0.25rem;
  }
}

/* 响应式布局 */
@media (max-width: 1280px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>