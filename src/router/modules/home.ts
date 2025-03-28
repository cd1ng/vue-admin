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
			meta: {
				KeepAlive: true
			},
			// 重定向到用户管理
			redirect: '/role/group',
			children: [
				{
					path: '/role/group',
					name: 'GroupPage',
					component: () => import('@/views/role/group.vue')
				},
				{
					path: '/role/power',
					name: 'PowerPage',
					component: () => import('@/views/role/index.vue')
				}
			]
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
		},
		{
			path: '/article',
			name: 'ArticlePage',
			component: () => import('@/views/article/index.vue'),
			meta: {
				KeepAlive: true
			}
		}
	]
}
