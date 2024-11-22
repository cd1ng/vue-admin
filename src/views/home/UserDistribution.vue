<script setup lang="ts">
import { useChartSize } from '@/hooks'
import type { ECOption } from '@/types/echart'
import type { UserDistributionData } from '@/types/api'

//声明周期函数，自动执行初始化
const { initChart } = useChartSize('pie-chart')
const props = defineProps<{
	userDistributionData: UserDistributionData
}>()

// 数据处理
const handleData = (data: UserDistributionData) => {
	const nameArr = {
		normal: '普通用户',
		vip: 'VIP用户',
		admin: '管理员'
	}
	return Object.entries(data).map(([key, value]) => ({
		value,
		name: nameArr[key as keyof UserDistributionData]
	}))
}

// 创建图表配置函数
const createChartOptions = (data: UserDistributionData): ECOption => ({
	title: { text: '用户分布' },
	tooltip: { trigger: 'item' },
	legend: { orient: 'vertical', left: 'right' },
	series: [
		{
			type: 'pie',
			radius: '50%',
			data: handleData(data)
		}
	]
})

// 初始化
onMounted(() => {
	initChart(createChartOptions(props.userDistributionData))
})

// 监听 visitData 的变化
watch(
	() => props.userDistributionData,
	(newData) => {
		initChart(createChartOptions(newData))
	},
	{ deep: true } // 深度监听对象的变化
)
</script>
<template>
	<div id="pie-chart"></div>
</template>
