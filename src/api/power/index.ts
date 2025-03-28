import * as powerService from './server'

/**
 * 创建新的用户组
 */
async function createrGroup(new_group: string, permission_list: string[]) {
	try {
		const response = await powerService.createrGroup(new_group, permission_list)
		return response.data
	} catch (error) {
		console.error('新增用户组失败:', error)
		return null
	}
}

/**
 * 获取全部用户组
 *
 */
async function getGroups() {
	try {
		const response = await powerService.getGroups()
		console.log(response)
		return response.data
	} catch (error) {
		console.error('获取全部用户组失败:', error)
		return null
	}
}

/**
 * 删除用户组
 *
 */
async function deleteGroups(id: string) {
	try {
		const response = await powerService.deleteGroups(id)
		return response.data
	} catch (error) {
		console.error('删除用户组失败:', error)
		return null
	}
}

/**
 * 修改用户组
 *
 */
async function changeUserGroup(id: string, group_name: string, permission_list: string[]) {
	try {
		const response = await powerService.changeUserGroup(id, group_name, permission_list)
		return response.data
	} catch (error) {
		console.error('修改用户组失败:', error)
		return null
	}
}

export const powerApis = {
	createrGroup,
	getGroups,
	deleteGroups,
	changeUserGroup
}
