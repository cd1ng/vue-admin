/**
 * 业务层只允许调用api，不能直接调用service
 */

import * as authService from './server'
/**
 * 获取用户列表
 */
async function login(username: string, password: string) {
	try {
		const response = await authService.login(username, password)
		return {
			data: response.data
		}
	} catch (error) {
		console.error('获取用户列表失败:', error)
		return {
			data: []
		}
	}
}

export const authApi = {
	login
}
