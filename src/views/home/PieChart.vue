<script setup lang="ts">
import { useChartSize } from '@/hooks'
import { ECOption } from '@/types/echart'
//声明周期函数，自动执行初始化
const { initChart } = useChartSize('pie-chart')

onMounted(() => {
	const options = {
		title: { text: '用户分布' },
		tooltip: { trigger: 'item' },
		legend: { orient: 'vertical', left: 'right' },
		series: [
			{
				type: 'pie',
				radius: '50%',
				data: [
					{ value: 435, name: '普通用户' },
					{ value: 124, name: 'VIP用户' },
					{ value: 32, name: '管理员' }
				]
			}
		]
	} as ECOption
	initChart(options)
})
</script>
<template>
	<div id="pie-chart"></div>
</template>
