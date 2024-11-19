<script setup lang="ts">
import * as echarts from 'echarts'
import InfoCard from './InfoCard.vue'
import type { InfoData } from './types'

defineOptions({
	name: 'HomePage'
})

const infoCard = ref<InfoData[]>([
	{ title: '总用户数', value: '1,234', color: '#9396f1' },
	{ title: '今日访问', value: '423', color: '#20F9F1' },
	{ title: '文档数量', value: '56', color: '#F3C6f1' },
	{ title: '系统消息', value: '12', color: '#F5De0b' }
])

onMounted(() => {
	initPieChart()
	initLineChart()
})

const initPieChart = () => {
	const pieChart = echarts.init(document.getElementById('pieChart'))
	pieChart.setOption({
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
	})
}

const initLineChart = () => {
	const lineChart = echarts.init(document.getElementById('lineChart'))
	lineChart.setOption({
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
	})
}
</script>

<template>
	<InfoCard :info-data="infoCard" />
	<!-- 图表区域 -->
	<div class="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
		<div class="bg-white p-4 rounded-lg shadow-sm">
			<div id="pieChart" style="height: 400px"></div>
		</div>
		<div class="bg-white p-4 rounded-lg shadow-sm">
			<div id="lineChart" style="height: 400px"></div>
		</div>
	</div>
</template>
