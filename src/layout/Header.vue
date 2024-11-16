<script setup lang="ts">
import { User } from '@element-plus/icons-vue'

const handleLogout = () => {
	console.log('退出')
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
					<el-avatar :size="32" :icon="User" />
					<span class="ml-2">用户名</span>
				</div>
				<el-button type="primary" link @click="handleLogout"> 退出登录 </el-button>
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
