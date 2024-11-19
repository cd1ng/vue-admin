import type { StatusConfig } from '@/views/list/types'

// 列表状态枚举
export const STATUS = {
	PENDING: 'Pending',
	IN_PROGRESS: 'InProgress',
	DONE: 'Done'
} as const

// 列表状态映射配置
export const STATUS_CONFIG: Record<string, StatusConfig> = {
	[STATUS.PENDING]: {
		type: 'warning',
		value: STATUS.PENDING,
		label: '待处理'
	},
	[STATUS.IN_PROGRESS]: {
		type: 'primary',
		value: STATUS.IN_PROGRESS,
		label: '进行中'
	},
	[STATUS.DONE]: {
		type: 'success',
		value: STATUS.DONE,
		label: '已完成'
	}
} as const

// 头部高度
export const HEADER_HEIGHT = 60
// 表格搜索区域高度
export const TABLE_SEARCH_HEIGHT = 110
// 分页高度
export const PAGE_SIZE_HEIGHT = 200
