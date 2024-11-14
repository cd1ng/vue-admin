export default {
	path: '/:pathMatch(.*)*',
	name: 'NotFound',
	component: () => import('@/views/notFound/index.vue'),
	meta: {},
	children: []
}
