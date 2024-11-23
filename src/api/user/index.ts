/**
 * 业务层只允许调用api，不能直接调用service
 */

import * as userService from './server'
/**
 * 获取用户列表
 */
async function getList() {
	try {
		const response = await userService.getUserList()
		return {
			data: response.data || []
		}
	} catch (error) {
		console.error('获取用户列表失败:', error)
		return {
			data: []
		}
	}
}

/**
 * 获取用户详情
 */
async function getDetail(id: string) {
	try {
		const response = await userService.getUserDetail(id)
		return response.data
	} catch (error) {
		console.error('获取用户详情失败:', error)
		return null
	}
}

export const userApis = {
	getList,
	getDetail
}
