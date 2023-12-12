import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const iconDirectory = resolve(__dirname, 'icons')

export default ({ mode }) => {
	// eslint-disable-next-line node/prefer-global/process
	const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process?.cwd())

	return defineConfig({
		base: VITE_BASE_URL,
		plugins: [
			vue({
				template: {
					compilerOptions: {
						// treat all tags with a dash as custom elements
						isCustomElement: tag => tag.includes('-'),
					},
				},
			}),
			UnoCSS({
				shortcuts: [
					{ logo: 'i-logos-vue w-6em h-6em transform transition-800' },
				],
				presets: [
					presetUno(),
					presetAttributify(),
					presetIcons({
						extraProperties: {
							'display': 'inline-block',
							'vertical-align': 'middle',
						},
						collections: {
							custom: FileSystemIconLoader(iconDirectory),
						},
					}),
				],
			}),
			AutoImport({
				imports: ['vue', 'vue-router', 'pinia'],
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
			Components({
				resolvers: [
					IconsResolver({
						enabledCollections: ['lets-icons'],
					}),
				],
			}),
			Icons({
				autoInstall: true,
			}),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
		optimizeDeps: {
			include: ['pinia', '@vueuse/core'],
			exclude: ['@iconify-icons/lets-icons'],
		},
		server: {
			// The port number
			port: VITE_PORT,
			// Listen on all addresses
			host: '0.0.0.0',
			// Whether to automatically open the browser when the service starts
			open: true,
			// Allow cross domain
			cors: true,
			// Custom proxy rules
			proxy: {},
			// Warm files to convert and cache results early,
			// reducing initial page load times during startup and preventing conversion waterfalls
			warmup: {
				clientFiles: ['./index.html', './src/{views,components}/*'],
			},
		},
		build: {
			// Set the browser compatibility target for the final build
			target: 'es2015',
			// Whether to generate a source map file after building
			sourcemap: false,
			// Limit for chunk size warnings in kbs
			chunkSizeWarningLimit: 2000,
			// Enable/disable gzip compression size reporting
			reportCompressedSize: false,
			// Customize the underlying Rollup packaging configuration
			rollupOptions: {
				output: {
					// Specify the entry file mode of chunks
					entryFileNames: 'static/js/[name]-[hash].js',
					// Custom naming of chunks generated during code splitting
					chunkFileNames: 'static/js/[name]-[hash].js',
					// Customize static resource names in build results
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					// Compress extra code generated by Rollup
					compact: true,
					// Create a custom public chunk
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
					},
				},
			},
		},
	})
}
