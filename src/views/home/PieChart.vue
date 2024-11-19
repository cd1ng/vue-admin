<script setup lang="ts">
import * as echarts from 'echarts'
//声明周期函数，自动执行初始化
onMounted(() => {
	init()
})
//初始化函数
function init() {
	// 基于准备好的dom，初始化echarts实例
	let chart = echarts.init(document.getElementById('pie-chart'))
	// 绘制图表
	let options = {
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
	}
	// 渲染图表
	chart.setOption(options)
}
</script>
<template>
	<div id="pie-chart"></div>
</template>
