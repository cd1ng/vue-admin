/**
 * 避免依赖倒置,封装axios请求
 */

import axios, { AxiosRequestConfig } from 'axios'

// 创建请求实例
const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 添加 token
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 封装请求方法
const request = {
	GET: <T>(url: string, config?: AxiosRequestConfig) => {
		return instance.get<T>(url, config)
	},
	POST: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
		return instance.post<T>(url, data, config)
	},
	PUT: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
		return instance.put<T>(url, data, config)
	},
	DELETE: <T>(url: string, config?: AxiosRequestConfig) => {
		return instance.delete<T>(url, config)
	},
	// 通用请求方法
	request: <T>(method: Api.ApiMethod, url: string, config?: AxiosRequestConfig) => {
		switch (method) {
			case 'GET':
				return request.GET<T>(url, config)
			case 'POST':
				return request.POST<T>(url, config?.data, config)
			case 'PUT':
				return request.PUT<T>(url, config?.data, config)
			case 'DELETE':
				return request.DELETE<T>(url, config)
			default:
				return request.GET<T>(url, config)
		}
	}
}

export default request
