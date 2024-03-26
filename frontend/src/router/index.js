import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/gildirak-sexi',
		component: () => import('../views/gildirakSexi/Home.vue'),
		children: [
			{
				path: '/gildirak-sexi', 
				name: '/gildirak-sexi',
				component: () => import('../views/gildirakSexi/Home.vue')
			},
			{
				path: '/gildirak-sexi/vu-53',
				name: 'Vu-53',
				component: () => import('../views/gildirakSexi/VU-53.vue')
			},
			{
				path: '/gildirak-sexi/vu-90',
				name: 'Vu-90',
				component: () => import('../views/gildirakSexi/VU-90.vue')
			},
			{
				path: '/gildirak-sexi/vu-91',
				name: 'Vu-91',
				component: () => import('../views/gildirakSexi/VU-91.vue')
			},
			{
				path: '/gildirak-sexi/naplavka',
				name: '/gildirak-sexi/naplavka',
				component: () => import('../views/gildirakSexi/Naplavka.vue')
			}
		]
	},
	{
		path: '/users',
		name: 'Users',
		component: () => import('../views/User.vue')
	},
	{
		path: '/settings',
		name: 'Settings',
		component: () => import('../views/Settings.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	}
	]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
