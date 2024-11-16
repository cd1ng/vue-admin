export default {
	path: '/',
	name: 'Home',
	// 作为子路由，需要使用 Layout 组件包裹
	component: () => import('@/layout/index.vue'),
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/home/index.vue')
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import('@/views/user/index.vue')
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import('@/views/role/index.vue')
		},
		{
			path: '/list',
			name: 'ListPage',
			component: () => import('@/views/list/index.vue')
		}
	]
}
