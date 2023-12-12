import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	presetWind,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	shortcuts: [
		['btn', 'px-6 py-2 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 outline-none border-none'],
		['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
		['input-field', 'focus:shadow-outline w-full appearance-none border rounded px-3 py-2 text-gray-700 leading-tight shadow focus:outline-none'],
		['link', 'text-green-600 font-bold no-underline'],
	],
	presets: [
		presetWind(),
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: 'DM Sans',
				serif: 'DM Serif Display',
				mono: 'DM Mono',
			},
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	safelist: 'prose m-auto text-left'.split(' '),
})
