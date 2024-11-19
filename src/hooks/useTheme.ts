import { useDark } from '@vueuse/core'

/**
 * 主题切换
 * @returns 主题状态和切换主题的方法
 */
export const useTheme = () => {
	const isDark = useDark({
		selector: 'html',
		attribute: 'class',
		valueDark: 'dark',
		valueLight: 'light'
	})
	const toggleTheme = () => {
		isDark.value = !isDark.value
	}
	return { theme: isDark, toggleTheme }
}
