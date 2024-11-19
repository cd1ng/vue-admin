/**
 * 接口服务service层
 */
import request from '@/utils/request'
import { listApis } from '@/http/apiMap'

/**
 * 获取数据列表
 * @returns
 */
export async function getDataList() {
	const [method, url] = listApis.getList
	return request[method](url)
}
