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
			meta: {
				KeepAlive: true
			},
			// 重定向到列表详情页
			redirect: '/list/detail',
			children: [
				{
					path: '/list/detail',
					name: 'ListDetailPage',
					component: () => import('@/views/list/index.vue')
				},
				{
					path: '/list/others',
					name: 'OthersTablePage',
					component: () => import('@/views/list/OthersTable.vue')
				}
			]
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
