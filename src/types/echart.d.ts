// 通过ts限制echarts引入的模块

// 引入系列类型的定义
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
// 引入组件
import type { TitleComponentOption, TooltipComponentOption, GridComponentOption, LegendComponentOption,DatasetComponentOption } from 'echarts/components'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>
