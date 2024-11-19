import { useClipboard } from '@vueuse/core'

/**
 * 文本复制
 * @returns {copyText: (text: string) => Promise<void>}
 */
export const useCopy = () => {
	const source = ref('')
	const { copy } = useClipboard({ source })
	const copyText = async (text: string) => {
		try {
			source.value = text
			await copy()
			ElMessage.success('复制成功')
		} catch (err) {
			ElMessage.error('复制失败')
			console.error('复制失败:', err)
		}
	}
	return { copyText }
}
