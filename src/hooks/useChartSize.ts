import { echarts } from '@/utils'
import type { ECOption } from '@/types/echart'
/**
 * 图表尺寸
 * @param domId 图表domId
 * @returns 初始化图表函数
 */
export function useChartSize(domId: string) {
	let chart: echarts.ECharts | null = null

	// 在dom挂载之后，传入options，初始化图表
	const initChart = (options: ECOption) => {
		if (!chart) {
			chart = echarts.init(document.getElementById(domId))
		}
		chart.setOption(options)
	}

	// 监听窗口大小变化
	const handleResize = () => {
		chart?.resize()
	}

	// 挂载
	onMounted(() => {
		window.addEventListener('resize', handleResize)
	})

	// 卸载
	onUnmounted(() => {
		window.removeEventListener('resize', handleResize)
		chart?.dispose()
		chart = null
	})

	return {
		initChart
	}
}
