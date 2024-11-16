/**
 * 设置本地存储
 * @param key 键
 * @param value 值
 */
export function setSessionStorage(key: string, value: string) {
	sessionStorage.setItem(key, value)
}

/**
 * 清除本地存储
 */
export function clearSessionStorage() {
	const needClear: string[] = ['token', 'username', 'role', 'image']
	for (const item of needClear) {
		sessionStorage.removeItem(item)
	}
}
