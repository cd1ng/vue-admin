/**
 * 接口apiMap
 * 封装了method和url的形式,规避了url的硬编码
 */

/**
 * 用户相关接口
 */
export const userApis: ApiMap = {
	getUsersList: ['GET', '/api/users'],
	addUsers: ['POST', '/api/users'],
	getUsersDetail: ['GET', '/api/users/{id}'],
	updateUsers: ['PUT', '/api/users/{id}'],
	deleteUsers: ['DELETE', '/api/users/{id}']
}

/**
 * 权限相关接口
 */
export const authApis: ApiMap = {
	login: ['POST', '/api/login']
}

/**
 * 数据列表
 */
export const listApis: ApiMap = {
	getList: ['GET', '/api/list']
}
