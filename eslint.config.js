import antfu from '@antfu/eslint-config'

export default antfu(
	{
		unocss: true,
		formatters: true,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
		},
		// TypeScript and Vue are auto-detected, you can also explicitly enable them:
		typescript: true,
		vue: true,
	},
	{
		rules: {
			'curly': ['error', 'multi-line'],
			'style/brace-style': ['error', '1tbs'],
		},
	},
)
