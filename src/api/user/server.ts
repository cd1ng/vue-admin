/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { userApis } from '@/api/apiMap'
import type { UserInfo } from './type'

/**
 * 用户登录
 * @returns
 */
export async function login(username: string, password: string) {
	const [method, url] = userApis.login
	return request[method](url, { params: { username, password } })
}

/**
 * 用户注册
 * @returns
 */
export async function register(username: string, password: string) {
	const [method, url] = userApis.register
	return request[method](url, { params: { username, password } })
}

/**
 * 获取用户权限
 * @returns
 */
export async function getUserAuth(userId: string) {
	const [method, url] = userApis.getUserAuth
	return request[method](url, { params: { userId } })
}

/**
 * 获取用户列表
 * @returns
 */
export async function getUserList() {
	const [method, url] = userApis.getUsersList
	return request[method]<UserInfo[]>(url)
}

/**
 * 获取用户个人信息
 * @param id 用户Id
 * @returns
 */
export async function getUserDetail(id: string) {
	const [method, url] = userApis.getUsers
	return request[method]<UserInfo[]>(url, { params: { id } })
}
