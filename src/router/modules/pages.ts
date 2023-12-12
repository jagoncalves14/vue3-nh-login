import Home from '@/views/Home.vue'
import Pinia from '@/views/SomePage.vue'

export default [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/some-page',
		name: 'somePage',
		component: Pinia,
		meta: {
			requiresAuth: true,
		},
	},
]
