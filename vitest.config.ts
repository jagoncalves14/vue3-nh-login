import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
	plugins: [
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia', 'vitest'],
			resolvers: [
				IconsResolver({
					prefix: 'Icon',
				}),
			],
			eslintrc: {
				enabled: true,
			},
			dts: true,
		}),
	],
	test: {
		include: ['**/*.spec.ts'],
		environment: 'jsdom',
		globals: true,
	},
})
