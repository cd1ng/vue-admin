/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { dataApi } from '@/http/apiMap'

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
	return request[method](url)
}

/**
 * 获取销售量
 */
export async function getSaleCount() {
	const [method, url] = dataApi.getSaleCount
	return request[method](url)
}

/**
 * 获取用户分布
 */
export async function getUserDistribution() {
	const [method, url] = dataApi.getUserDistribution
	return request[method](url)
}
	
