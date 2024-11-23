/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { dataApis } from '@/api/apiMap'
import type { SaleDataType, UserDistributionData, VisitData } from './type'
import type { InfoData } from '@/views/home/types'

/**
 * 获取数据列表
 * @returns
 */
export async function getDataList() {
	const [method, url] = dataApis.getList
	return request[method](url)
}

/**
 * 获取访问量
 */
export async function getVisits() {
	const [method, url] = dataApis.getVisits
	return request[method]<VisitData>(url)
}

/**
 * 获取销售量
 */
export async function getSaleCount() {
	const [method, url] = dataApis.getSaleCount
	return request[method]<SaleDataType[]>(url)
}

/**
 * 获取用户分布
 */
export async function getUserDistribution() {
	const [method, url] = dataApis.getUserDistribution
	return request[method]<UserDistributionData[]>(url)
}

/**
 * 获取工作情况
 * @param username 用户名
 * @returns
 */
export async function getWorkInfo() {
	const [method, url] = dataApis.getWorkInfo
	return request[method]<InfoData[]>(url)
}
