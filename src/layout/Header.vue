<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/userInfo'

const router = useRouter()
const { userInfo, clearUserInfo } = useUserInfoStore()

const handleLogout = () => {
	clearUserInfo()
	router.push('/login')
}
</script>

<template>
	<ElHeader class="header-container">
		<div class="flex items-center justify-between px-4 h-full">
			<div class="flex items-center">
				<h1 class="ml-4 text-xl font-semibold">后台管理系统</h1>
			</div>

			<div class="flex items-center space-x-4">
				<div class="flex items-center">
					<ElAvatar v-if="!userInfo.image" :size="32" :icon="User" />
					<img v-else :src="userInfo.image" class="w-[32px] h-[32px] rounded-full" alt="头像" />
					<span class="ml-2">{{ userInfo.username ?? '用户名' }}</span>
				</div>
				<ElButton type="primary" link @click="handleLogout"> 退出登录 </ElButton>
			</div>
		</div>
	</ElHeader>
</template>

<style scoped>
.header-container {
	height: 60px;
	background-color: white;
	border-bottom: 1px solid #e5e7eb;
	padding: 0;
}
</style>
