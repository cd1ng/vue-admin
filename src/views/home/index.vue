<script setup lang="ts">
import * as echarts from 'echarts'
defineOptions({
	name: 'HomePage'
})
const statistics = ref([
	{ title: '总用户数', value: '1,234', icon: 'User', color: 'bg-blue-100 text-blue-600' },
	{ title: '今日访问', value: '423', icon: 'View', color: 'bg-green-100 text-green-600' },
	{ title: '文档数量', value: '56', icon: 'Document', color: 'bg-purple-100 text-purple-600' },
	{ title: '系统消息', value: '12', icon: 'Bell', color: 'bg-orange-100 text-orange-600' }
])

onMounted(() => {
	initPieChart()
	initLineChart()
})

const initPieChart = () => {
	const pieChart = echarts.init(document.getElementById('pieChart'))
	pieChart.setOption({
		// title: { text: '用户分布' },
		tooltip: { trigger: 'item' },
		legend: { orient: 'vertical', left: 'left' },
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
	<div class="p-6 space-y-6">
		<!-- 统计卡片 -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div v-for="item in statistics" :key="item.title" class="p-4 rounded-lg bg-white shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-500 text-sm">{{ item.title }}</p>
						<p class="text-2xl font-semibold mt-1">{{ item.value }}</p>
					</div>
					<div :class="[item.color, 'p-3 rounded-full']">
						<el-icon><component :is="item.icon" /></el-icon>
					</div>
				</div>
			</div>
		</div>

		<!-- 图表区域 -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="bg-white p-4 rounded-lg shadow-sm">
				<div id="pieChart" style="height: 400px"></div>
			</div>
			<div class="bg-white p-4 rounded-lg shadow-sm">
				<div id="lineChart" style="height: 400px"></div>
			</div>
		</div>
	</div>
</template>
