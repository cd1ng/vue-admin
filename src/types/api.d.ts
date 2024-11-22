import { type } from './auto-imports';
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ApiMap = Record<string, [ApiMethod, string]>

// 定义接口返回类型
interface LoginParams {
	username: string
	password: string
}

interface UserInfo {
	token: string
	username: string
	role: string
	image: string
}

// 列表数据
interface ListItem {
	id: number
	name: string
	status: string
	date: string
	address: string
}

// 访问量数据
type VisitData = {
	Monday: number
	Tuesday: number
	Wednesday: number
	Thursday: number
	Friday: number
	Saturday: number
	Sunday: number
}

// 销售数据
type SaleDataType = {
	name: string
	type: string
	count: number
}

// 用户分布数据
type UserDistributionData = {
	normal: number
	vip: number
	admin: number
}

type WorkInfoData = {
	title: string
	count: number
	color: string
}

