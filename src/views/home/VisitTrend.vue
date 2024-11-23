<script setup lang="ts">
import { useChartSize } from '@/hooks/useChartSize'
import type { VisitData } from '@/api/data/type'
import type { ECOption } from '@/types/echart'

const { initChart } = useChartSize('line-chart')

const props = defineProps<{ visitData: VisitData }>()
// 创建图表配置函数
const createChartOptions = (data: VisitData): ECOption => ({
	title: { text: '近七日访问趋势' },
	tooltip: { trigger: 'axis' },
	xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	},
	yAxis: { type: 'value' },
	series: [
		{
			data: orderDay(data),
			type: 'line',
			smooth: true
		}
	]
})

// 按照指定日期顺序排序
const orderDay = (data: VisitData) => {
	// 按照指定日期顺序排序
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	return days.map((day) => data[day as keyof VisitData])
}

// 初始化
onMounted(() => {
	initChart(createChartOptions(props.visitData))
})

// 监听 visitData 的变化
watch(
	() => props.visitData,
	(newData) => {
		initChart(createChartOptions(newData))
	},
	{ deep: true } // 深度监听对象的变化
)
</script>
<template>
	<div id="line-chart"></div>
</template>
