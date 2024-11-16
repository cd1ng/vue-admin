type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ApiMap = Record<string, [ApiMethod, string]>


// 定义接口返回类型
interface LoginParams {
	username: string
	password: string
}

interface UserInfo {
	id: string
	name: string
	role: string
}
