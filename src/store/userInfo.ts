import type { UserInfo } from "@/types/api"

export const useUserInfoStore = defineStore(
	'userInfo',
	() => {
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
			userInfo.value = {
				...userInfo.value,
				username: '',
				token: '',
				role: '',
				image: ''
			}
		}
		return { userInfo, setUserInfo, clearUserInfo }
	},
	{
		persist: true
	}
)
