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
	login: ['POST', '/login/'],
	// 注册接口
	register: ['POST', '/register/'],
	// 获取用户权限
	getUserAuth: ['POST', '/check_permission/']
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
	getUserDistribution: ['GET', '/user-distribution'],
	// 新建文章
	createArticle: ['POST', '/add_article/']
}

/**
 * 权限相关接口
 */
export const powerApis: Api.ApiMap = {
	// 新增用户组
	createrGroup: ['PUT', '/add_group/'],
	// 获取全部用户组
	getGroups: ['GET', '/get_all_groups/'],
	// 删除用户组
	deleteGroups: ['POST', '/delete_group/'],
	// 修改用户组
	changeUserGroup: ['POST', '/change_group/'],
	// RESTFUL 风格
	// 获取用户
	getUser: ['GET', '/user_manage/'],
	// 修改用户
	updateUser: ['PUT', '/user_manage/'],
	// 删除用户
	deleteUser: ['DELETE', '/user_manage/']
}
