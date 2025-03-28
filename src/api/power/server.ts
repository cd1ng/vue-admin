/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { powerApis } from '@/api/apiMap'

/**
 * 获取数据列表
 * @returns
 */
export async function createrGroup(new_group: string, permission_list: string[]) {
	const [method, url] = powerApis.createrGroup
	return request[method](url, { params: { new_group, permission_list } })
}

/**
 * 删除用户组
 * @returns
 */
export async function deleteGroups(id: string) {
	const [method, url] = powerApis.deleteGroups
	return request[method](url, { params: { id } })
}

/**
 * 获取全部用户组
 * @returns
 */
export async function getGroups() {
	const [method, url] = powerApis.getGroups
	return request[method](url)
}

/**
 * 修改用户组
 * @returns
 */
export async function changeUserGroup(id: string, group_name: string, permission_list: string[]) {
	const [method, url] = powerApis.changeUserGroup
	return request[method](url, { params: { id, group_name, permission_list } })
}

/**
 * 获取用户
 * @param id 用户Id
 * @returns
 */
export async function getUser() {
	const [method, url] = powerApis.getUser
	return request[method](url)
}

/**
 * 修改用户
 * @param user 用户信息
 * @returns
 */
export async function updateUser(id: string, username: string, groupName: string) {
	const [method, url] = powerApis.updateUser
	return request[method](url, { params: { id, username, group: groupName } })
}

/**
 * 删除用户
 * @param id 用户Id
 * @returns
 */
export async function deleteUser(id: string) {
	const [method, url] = powerApis.deleteUser
	return request[method](url, { params: { id } })
}
