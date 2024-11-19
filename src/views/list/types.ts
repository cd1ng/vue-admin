// 状态类型
export type TagType = 'success' | 'warning' | 'primary'

// 状态类型
export type StatusKey = 'PENDING' | 'IN_PROGRESS' | 'DONE'

// 状态配置类型
export interface StatusConfig {
	type: TagType
	value: string
	label: string
}

// 表格数据类型
export interface TableItem {
	id: string
	name: string
	status: string
	url: string
	date: string
	address: string
	email: string
}

// 过滤信息类型
export interface FilterInfoState {
	name: string
	status: string
	date: string
}

export type SearchKey = keyof FilterInfoState
