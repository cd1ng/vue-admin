import type { SaleDataType, UserDistributionData, VisitData } from '@/api/data/type'

// 空浏览数据
export const emptyVisitData: VisitData = {
	Monday: 0,
	Tuesday: 0,
	Wednesday: 0,
	Thursday: 0,
	Friday: 0,
	Saturday: 0,
	Sunday: 0
}

// 空销售数据
export const emptySaleData: SaleDataType[] = [
	{
		name: '',
		type: '',
		count: 0
	}
]

// 空用户分布数据
export const emptyUserDistributionData: UserDistributionData = {
	normal: 0,
	vip: 0,
	admin: 0
}
