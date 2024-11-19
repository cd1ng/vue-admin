/**
 * 接口apiMap
 * 封装了method和url的形式,规避了url的硬编码
 */

/**
 * 用户相关接口
 */
export const userApis: ApiMap = {
	// 获取用户列表
	getUsersList: ['GET', '/api/users'],
	// 获取用户详情
	getUsersDetail: ['GET', '/api/users/{id}']
}

/**
 * 权限相关接口
 */
export const authApis: ApiMap = {
	// 登录接口
	login: ['POST', '/api/login'],
	// 权限列表
	getAuthList: ['GET', '/api/auth/{id}']
}

/**
 * 数据列表
 */
export const listApis: ApiMap = {
	// 数据列表
	getList: ['GET', '/api/list'],
	// 工作情况
	getWorkInfo: ['GET', '/api/workInfo/{id}'],
	// 页面访问量
	getPageview: ['GET', '/api/pageview/{id}']
}
