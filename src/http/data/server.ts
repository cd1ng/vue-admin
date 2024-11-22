/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { dataApi } from '@/http/apiMap'
import { SaleDataType, UserDistributionData, VisitData } from '@/types/api'
import { InfoData } from '@/views/home/types'

/**
 * 获取数据列表
 * @returns
 */
export async function getDataList() {
	const [method, url] = dataApi.getList
	return request[method](url)
}

/**
 * 获取访问量
 */
export async function getVisits() {
	const [method, url] = dataApi.getVisits
	return request[method]<VisitData[]>(url)
}

/**
 * 获取销售量
 */
export async function getSaleCount() {
	const [method, url] = dataApi.getSaleCount
	return request[method]<SaleDataType[]>(url)
}

/**
 * 获取用户分布
 */
export async function getUserDistribution() {
	const [method, url] = dataApi.getUserDistribution
	return request[method]<UserDistributionData[]>(url)
}

/**
 * 获取工作情况
 * @param username 用户名
 * @returns
 */
export async function getWorkInfo() {
	const [method, url] = dataApi.getWorkInfo
	return request[method]<InfoData[]>(url)
}
