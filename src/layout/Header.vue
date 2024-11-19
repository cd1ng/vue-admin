<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/userInfo'

const router = useRouter()
const { userInfo, clearUserInfo } = useUserInfoStore()

const handleLogout = () => {
	clearUserInfo()
	ElMessage.success('退出登录成功')
	router.push('/login')
}
</script>

<template>
	<div class="flex items-center justify-between h-full">
		<h1 class="text-xl font-semibold select-none text">后台管理系统</h1>
		<div class="flex items-center space-x-4">
			<ThemeSwitch />
			<ElDropdown trigger="hover">
				<div class="flex items-center select-none cursor-pointer outline-none">
					<ElAvatar :size="32" :icon="User" class="w-[32px] h-[32px] rounded-full" />
					<span class="ml-2 select-none text">{{ userInfo.username ?? '用户名' }}</span>
					<ElIcon class="ml-1"><ArrowDown /></ElIcon>
				</div>
				<template #dropdown>
					<ElDropdownMenu>
						<ElDropdownItem>个人信息</ElDropdownItem>
						<ElDropdownItem divided @click="handleLogout">退出登录</ElDropdownItem>
					</ElDropdownMenu>
				</template>
			</ElDropdown>
		</div>
	</div>
</template>
