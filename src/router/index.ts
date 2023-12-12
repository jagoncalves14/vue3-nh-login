import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

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

export default router
