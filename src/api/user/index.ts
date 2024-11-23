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

/**
 * 用户登录
 */
async function login(username: string, password: string) {
	try {
		const response = await userService.login(username, password)
		return {
			data: response.data
		}
	} catch (error) {
		console.error('用户登录失败:', error)
		return {
			data: []
		}
	}
}

/**
 * 获取用户权限
 */
async function getUserAuth(userId: string) {
	try {
		const response = await userService.getUserAuth(userId)
		return {
			data: response.data
		}
	} catch (error) {
		console.error('用户登录失败:', error)
		return {
			data: []
		}
	}
}

export const userApis = {
	login,
	getUserAuth,
	getList,
	getDetail
}
