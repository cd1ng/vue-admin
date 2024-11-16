export default {
	path: '/',
	name: 'Home',
	// 作为子路由，需要使用 Layout 组件包裹
	component: () => import(/* webpackChunkName: "home" */ '@/layout/index.vue'),
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
		},
		{
			path: '/user',
			name: 'UserPage',
			component: import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
		},
		{
			path: '/role',
			name: 'RolePage',
			component: import(/* webpackChunkName: "role" */ '@/views/role/index.vue')
		},
		{
			path: '/list',
			name: 'ListPage',
			component: import(/* webpackChunkName: "list" */ '@/views/list/index.vue')
		}
	]
}
