import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabase'
import getUser from '@/api/auth/auth.get-user'

// Import all routing modules in router/modules folder
const files = import.meta.glob('./modules/*.ts', {
	eager: true,
}) as Record<RouteRecordRaw['path'], { default: RouteRecordRaw | RouteRecordRaw[] }>

// Route staging
const routeModuleList: RouteRecordRaw[] = []

// Traverse routing module
Object.keys(files).forEach((key) => {
	const module = files[key].default || {}
	const moduleList = Array.isArray(module) ? [...module] : [module]
	routeModuleList.push(...moduleList)
})

// Store dynamic routing
const asyncRouterList = [...routeModuleList]

// Store fixed routes
const defaultRouterList: readonly RouteRecordRaw[] = []

const routes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior() {
		return {
			el: '#app',
			top: 0,
			behavior: 'smooth',
		}
	},
})

supabase.auth.onAuthStateChange((event) => {
	if (event === 'SIGNED_OUT') {
		router.push('/sign-in')
	}

	if (event === 'SIGNED_IN') {
		const routeName = router.currentRoute.value.name

		if (routeName === 'callback') {
			setTimeout(() => {
				router.push({ name: 'home' })
			}, 0)
		}
	}
})

router.beforeEach(async (to) => {
	const { data } = await getUser()

	if (to.meta.requiresAuth && await !data.user) {
		return {
			path: '/sign-in',
		}
	}

	if (to.meta.requiresNoAuth && await data.user) {
		return {
			path: '/',
		}
	}
})

export default router
