import { clearSessionStorage, setSessionStorage } from '@/utils'

export const useUserInfoStore = defineStore('userInfo', () => {
	const userInfo = ref({
		username: '',
		token: '',
		role: '',
		image: ''
	})

	/**
	 * 设置用户信息
	 * @param info 用户信息
	 */
	const setUserInfo = (info: UserInfo) => {
		const { username, token, role, image } = info
		setSessionStorage('username', username)
		setSessionStorage('token', token)
		setSessionStorage('role', role)
		setSessionStorage('image', image)
		userInfo.value = {
			...userInfo.value,
			username,
			token,
			role,
			image
		}
	}

	/**
	 * 清除用户信息
	 */
	const clearUserInfo = () => {
		clearSessionStorage()
		userInfo.value = {
			...userInfo.value,
			username: '',
			token: '',
			role: '',
			image: ''
		}
	}

	return { userInfo, setUserInfo, clearUserInfo }
})
