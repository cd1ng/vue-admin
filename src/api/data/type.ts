// 访问量数据
export interface VisitData {
	Monday: number
	Tuesday: number
	Wednesday: number
	Thursday: number
	Friday: number
	Saturday: number
	Sunday: number
}

// 销售数据
export interface SaleDataType {
	name: string
	type: string
	count: number
}

// 用户分布数据
export interface UserDistributionData {
	normal: number
	vip: number
	admin: number
}

export interface WorkInfoData {
	title: string
	count: number
	color: string
}
