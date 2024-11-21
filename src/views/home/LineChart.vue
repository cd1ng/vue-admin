<script setup lang="ts">
import { useChartSize } from '@/hooks/useChartSize'
import { ECOption } from '@/types/echart'

const { initChart } = useChartSize('line-chart')

onMounted(() => {
	const options = {
		title: { text: '近七日访问趋势' },
		tooltip: { trigger: 'axis' },
		xAxis: {
			type: 'category',
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: { type: 'value' },
		series: [
			{
				data: [120, 132, 101, 134, 90, 230, 210],
				type: 'line',
				smooth: true
			}
		]
	} as ECOption
	initChart(options)
})
</script>
<template>
	<div id="line-chart"></div>
</template>
