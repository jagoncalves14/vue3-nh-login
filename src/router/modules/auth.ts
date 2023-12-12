import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'

export default [
	{
		path: '/sign-in',
		name: 'signIn',
		component: SignIn,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/sign-up',
		name: 'signUp',
		component: SignUp,
		meta: {
			requiresAuth: true,
		},
	},
]
