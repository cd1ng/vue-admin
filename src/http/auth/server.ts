/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { authApis } from '@/http/apiMap'

/**
 * 获取用户列表
 * @returns
 */
export async function login(username: string, password: string) {
	const [method, url] = authApis.login
	return request[method](url, { params: { username, password } })
}
