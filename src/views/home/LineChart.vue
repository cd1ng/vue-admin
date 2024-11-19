<script setup lang="ts">
import * as echarts from 'echarts'
//声明周期函数，自动执行初始化
onMounted(() => {
	init()
})
//初始化函数
function init() {
	// 基于准备好的dom，初始化echarts实例
	let chart = echarts.init(document.getElementById('line-chart'))
	// 绘制图表
	let options = {
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
	}

	// 渲染图表
	chart.setOption(options)
}
</script>
<template>
	<div id="line-chart"></div>
</template>
