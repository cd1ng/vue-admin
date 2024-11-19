import * as listService from './server'

/**
 * 获取数据列表
 */
async function getDataList() {
	try {
		const response = await listService.getDataList()
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

export const listApi = {
	getDataList
}
