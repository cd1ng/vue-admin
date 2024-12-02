<script setup lang="ts">
import { ArrowDown, User } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/userInfo'
import Logo from '@/components/Logo.vue'

const router = useRouter()
const { userInfo, clearUserInfo } = useUserInfoStore()

const handleLogout = () => {
	clearUserInfo()
	ElMessage.success('退出登录成功')
	router.push('/login')
}
</script>

<template>
	<div class="flex h-full items-center justify-between">
		<Logo class="hidden lg:block" />
		<div class="flex items-center space-x-4">
			<Capture />
			<ThemeSwitch />
			<ElDropdown trigger="hover">
				<div class="flex cursor-pointer select-none items-center outline-none">
					<ElAvatar :size="32" :icon="User" class="h-[32px] w-[32px] rounded-full" />
					<span class="text ml-2 select-none">{{ userInfo.username ?? '用户名' }}</span>
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
