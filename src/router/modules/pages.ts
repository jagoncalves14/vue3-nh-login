import Home from '@/views/Home.vue'
import Account from '@/views/Account.vue'

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
		path: '/account',
		name: 'account',
		component: Account,
		meta: {
			requiresAuth: true,
		},
	},
]
