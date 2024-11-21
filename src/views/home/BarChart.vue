<script setup lang="ts">
import { useChartSize } from '@/hooks'
import type { ECOption } from '@/types/echart'

//声明周期函数，自动执行初始化
const { initChart } = useChartSize('bar-chart')

onMounted(() => {
	const options = {
		title: {
			text: 'ECharts 入门示例'
		},
		tooltip: {},
		xAxis: {
			data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
		},
		yAxis: {},
		series: [
			{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}
		]
	} as ECOption
	initChart(options)
})
</script>
<template>
	<div id="bar-chart"></div>
</template>
