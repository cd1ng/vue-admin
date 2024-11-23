import { emptyUserDistributionData, emptyVisitData } from '@/constant/home'
import * as dataService from './server'

/**
 * 获取数据列表
 */
async function getDataList() {
	try {
		const response = await dataService.getDataList()
		return {
			data: response?.data || []
		}
	} catch (error) {
		console.error('数据列表获取失败:', error)
		return {
			data: []
		}
	}
}

/**
 * 获取访问量
 */
async function getVisits() {
	try {
		const response = await dataService.getVisits()
		return {
			data: response?.data || emptyVisitData
		}
	} catch (error) {
		console.error('访问量获取失败:', error)
		return {
			data: emptyVisitData
		}
	}
}

/**
 * 获取销售量
 */
async function getSaleCount() {
	try {
		const response = await dataService.getSaleCount()
		return {
			data: response?.data || []
		}
	} catch (error) {
		console.error('销售量获取失败:', error)
		return {
			data: []
		}
	}
}

/**
 * 获取用户分布
 */
async function getUserDistribution() {
	try {
		const response = await dataService.getUserDistribution()
		return {
			data: response?.data?.[0] || emptyUserDistributionData
		}
	} catch (error) {
		console.error('用户分布获取失败:', error)
		return {
			data: emptyUserDistributionData
		}
	}
}

/**
 * 获取工作情况
 */
async function getWorkInfo() {
	try {
		const response = await dataService.getWorkInfo()
		return {
			data: response?.data || []
		}
	} catch (error) {
		console.error('工作情况获取失败:', error)
		return {
			data: []
		}
	}
}

export const dataApis = {
	getDataList,
	getVisits,
	getSaleCount,
	getUserDistribution,
	getWorkInfo
}
