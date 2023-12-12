import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'

export default [
	{
		path: '/sign-in',
		name: 'signIn',
		component: SignIn,
	},
	{
		path: '/sign-up',
		name: 'signUp',
		component: SignUp,
	},
	{
		path: '/forgot-password',
		name: 'forgotPassword',
		component: ForgotPassword,
	},
]
