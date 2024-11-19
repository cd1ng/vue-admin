<script setup lang="ts">
import InfoCard from './InfoCard.vue'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'

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
</script>

<template>
	<div class="h-[calc(100vh-92px)] w-full flex flex-col">
		<InfoCard :info-data="infoCard" />
		<!-- 图表区域 -->
		<div class="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
			<PieChart class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
			<LineChart class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
			<BarChart class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
		</div>
	</div>
</template>
