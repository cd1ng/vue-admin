import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const autoImportConfig = JSON.parse(
	readFileSync(resolve(__dirname, '.eslintrc-auto-import.json'), 'utf8')
)

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node, ...autoImportConfig.globals } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	// prettier 默认推荐规则
	pluginPrettierRecommendedConfigs,
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{
		rules: {
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		ignores: ['dist', 'node_modules/*', '.commitlintrc.js', 'src/types']
	}
]
