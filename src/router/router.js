import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

let routes = [
	{
		path: '/',
		name: `index`,
		component: () => import(`../views/index`)
	},
	{
		path: '/assign',
		name: `assign`,
		component: () => import(`../views/assign`)
	},
	{
		path: '/details',
		name: `details`,
		component: () => import(`../views/details`)
	},
	{
		path: '/verify',
		name: `verify`,
		component: () => import(`../views/verify`)
	},
]

let router = createRouter({
	//history: createWebHistory(process.env.BASE_URL),
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
