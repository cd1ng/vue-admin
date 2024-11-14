import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { ModuleNamespace } from 'vite/types/hot.js'

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, ModuleNamespace> = import.meta.glob(['./modules/*.ts'], {
	eager: true
})

// 404 路由
const notFoundRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)*',
	name: 'NotFound',
	component: () => import('@/views/notFound/index.vue'),
	meta: {},
	children: []
}

// 配置路由
const routes: Array<RouteRecordRaw> = []
Object.keys(modules).forEach((key) => {
	const module = modules[key].default
	routes.push(module)
})
// 确保404路由最后被命中
routes.push(notFoundRoute)

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
