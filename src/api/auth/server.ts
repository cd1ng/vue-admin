/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { authApis } from '@/api/apiMap'

/**
 * 用户登录
 * @returns
 */
export async function login(username: string, password: string) {
	const [method, url] = authApis.login
	return request[method](url, { params: { username, password } })
}
