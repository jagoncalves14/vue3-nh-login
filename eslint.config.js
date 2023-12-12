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
		rules: {
			'curly': ['error', 'multi-line'],
			'style/brace-style': ['error', '1tbs'],
			'vue/no-deprecated-slot-attribute': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/valid-v-on': 'off',
			'vue/no-v-html': 'off',
			'vue/html-closing-bracket-spacing': 'error',
			'vue/html-closing-bracket-newline': ['error', {
				singleline: 'never',
				multiline: 'always',
			}],
		},
	},
)
