import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/index.vue'
import NotFound from '@/views/notFound/index.vue'
import User from '@/views/user/index.vue'
import Login from '@/views/login/index.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/user', component: User },
	{ path: '/login', component: Login },
	{ path: '/about', component: NotFound }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
