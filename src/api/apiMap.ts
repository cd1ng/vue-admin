/**
 * 接口apiMap
 * 封装了method和url的形式,规避了url的硬编码
 */

/**
 * 用户相关接口
 */
export const userApis: Api.ApiMap = {
	// 获取用户列表
	getUsersList: ['GET', '/users'],
	// 获取用户详情
	getUsersDetail: ['GET', '/users'],
	// 登录接口
	login: ['POST', '/login'],
	// 获取用户权限
	getUserAuth: ['GET', '/auth']
}

/**
 * 数据列表
 */
export const dataApis: Api.ApiMap = {
	// 数据列表
	getList: ['GET', '/list'],
	// 工作情况
	getWorkInfo: ['GET', '/work-info'],
	// 访问量
	getVisits: ['GET', '/visits'],
	// 销售量
	getSaleCount: ['GET', '/sale-count'],
	// 用户分布
	getUserDistribution: ['GET', '/user-distribution']
}
