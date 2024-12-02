<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import MonthView from './MonthView.vue'
import WeekView from './WeekView.vue'
import YearView from './YearView.vue'
import { generateMonthCalendar, generateWeekCalendar, generateYearCalendar } from '@/utils/calendar'

import type { SelectType, CalendarViewData } from './types'

const viewTypes = ['year', 'month', 'week'] as SelectType[]

const NEXT_STEP = 1
const BACK_STEP = -1

type StepType = typeof NEXT_STEP | typeof BACK_STEP

const calenderState = ref<{ currentDate: Dayjs; type: SelectType; selectDate: Dayjs }>({
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
const handleDateChange = (delta: StepType) => {
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

// 处理月份选择
const handleMonthSelect = (month: number) => {
	// 使用当前日期年份和选中的月份创建新的日期
	calenderState.value.currentDate = calenderState.value.currentDate.month(month)
	calenderState.value.type = 'month'
	yearDialogVisible.value = false
}

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
			<div class="mb-4 flex gap-2">
				<button v-for="type in viewTypes" :key="type" class="rounded-md p-1 transition-colors"
					:class="calenderState.type === type ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
					@click="handleViewChange(type)">
					{{ type === 'year' ? '年' : type === 'month' ? '月' : '周' }}
				</button>
			</div>

			<!-- 日期导航 -->
			<div class="flex items-center justify-between px-2">
				<button class="rounded-full p-2 hover:bg-gray-100" @click="handleDateChange(BACK_STEP)">&lt;</button>
				<span class="text-lg font-medium">
					{{ calenderState.currentDate.format('YYYY年MM月DD日') }}
				</span>
				<button class="rounded-full p-2 hover:bg-gray-100" @click="handleDateChange(NEXT_STEP)">&gt;</button>
			</div>
		</div>

		<!-- 日历视图区域 -->
		<div class="overflow-auto h-[calc(100%-7rem)]">
			<MonthView v-if="calenderState.type === 'month'" :calendar-data="CalendarData.month" :type="calenderState.type" />
			<WeekView v-else :calendar-data="CalendarData.week" :type="calenderState.type" />
		</div>

		<!-- 年份选择弹窗 -->
		<YearView v-if="yearDialogVisible" v-model="yearDialogVisible" :calendar-data="CalendarData.year" :type="'year'"
			@close="yearDialogVisible = false" @select="handleMonthSelect" />
	</div>
</template>