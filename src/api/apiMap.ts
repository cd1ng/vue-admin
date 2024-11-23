/**
 * 接口apiMap
 * 封装了method和url的形式,规避了url的硬编码
 */

/**
 * 用户相关接口
 */
export const userApis: Api.ApiMap = {
	// 获取用户列表
	getUsersList: ['GET', '/api/users'],
	// 获取用户详情
	getUsersDetail: ['GET', '/api/users'],
	// 登录接口
	login: ['POST', '/api/login'],
	// 获取用户权限
	getUserAuth: ['GET', '/api/auth']
}

/**
 * 数据列表
 */
export const dataApis: Api.ApiMap = {
	// 数据列表
	getList: ['GET', '/api/list'],
	// 工作情况
	getWorkInfo: ['GET', '/api/work-info'],
	// 访问量
	getVisits: ['GET', '/api/visits'],
	// 销售量
	getSaleCount: ['GET', '/api/sale-count'],
	// 用户分布
	getUserDistribution: ['GET', '/api/user-distribution']
}
