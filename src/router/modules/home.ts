export default {
	path: '/',
	name: 'Home',
	// 作为子路由，需要使用 Layout 组件包裹
	component: () => import('@/layout/index.vue'),
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/home/index.vue'),
			meta: {
				// 需要进行缓存
				KeepAlive: true
			}
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import('@/views/user/index.vue'),
			meta: {
				KeepAlive: true
			}
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import('@/views/role/index.vue'),
			meta: {
				KeepAlive: true
			}
		},
		{
			path: '/list',
			name: 'ListPage',
			component: () => import('@/views/list/index.vue'),
			meta: {
				KeepAlive: true
			}
		},
		{
			path: '/docs',
			name: 'DocsPage',
			component: () => import('@/views/docs/index.vue'),
			meta: {
				KeepAlive: true
			}
		},
		{
			path: '/editor',
			name: 'EditorPage',
			component: () => import('@/views/editor/index.vue'),
			meta: {
				KeepAlive: true
			}
		}
	]
}
