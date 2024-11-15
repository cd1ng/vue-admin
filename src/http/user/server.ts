/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { userApis } from '@/http/apiMap'

/**
 * 获取用户列表
 * @returns
 */
export async function getUserList() {
	const [method, url] = userApis.getUsersList
	console.log(method, url)
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
