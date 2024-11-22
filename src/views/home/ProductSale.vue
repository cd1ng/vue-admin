<script setup lang="ts">
import { useChartSize } from '@/hooks'
import type { SaleDataType } from '@/types/api'
import type { ECOption } from '@/types/echart'

const props = defineProps<{
	saleData: SaleDataType[]
}>()

//声明周期函数，自动执行初始化
const { initChart } = useChartSize('bar-chart')

const handleNameData = (data: SaleDataType[]) => {
	return data.map((item) => item.name)
}
const handleSaleData = (data: SaleDataType[]) => {
	return data.map((item) => item.count)
}

// 创建图表配置函数
const createChartOptions = (data: SaleDataType[]): ECOption => ({
	title: {
		text: '产品销售量'
	},
	tooltip: {},
	xAxis: {
		data: handleNameData(data)
	},
	yAxis: {},
	series: [
		{
			name: '销量',
			type: 'bar',
			data: handleSaleData(data)
		}
	]
})

// 初始化
onMounted(() => {
	initChart(createChartOptions(props.saleData))
})

// 监听 visitData 的变化
watch(
	() => props.saleData,
	(newData) => {
		initChart(createChartOptions(newData))
	},
	{ deep: true } // 深度监听对象的变化
)
</script>
<template>
	<div id="bar-chart"></div>
</template>
