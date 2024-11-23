// 引入 ECharts 核心模块，核心模块提供了 ECharts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入图表类型
import { BarChart, LineChart, PieChart } from 'echarts/charts'
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, TransformComponent, DatasetComponent, LegendComponent } from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'

// 注册必需的组件
echarts.use([
	BarChart,
	LineChart,
	PieChart,
	// 组件
	TitleComponent,
	TooltipComponent,
	GridComponent,
	TransformComponent,
	DatasetComponent,
	LegendComponent,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
])

export default echarts
