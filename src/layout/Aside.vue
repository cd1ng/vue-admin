<script setup lang="ts">
import { ref } from 'vue'
import { HomeFilled, Document, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const menuItems = [
	{
		icon: HomeFilled,
		title: '首页',
		index: '/'
	},
	{
		icon: Document,
		title: '列表',
		index: '/list'
	},
	{
		icon: Setting,
		title: '权限管理',
		index: '/role'
	}
]
</script>

<template>
	<ElAside :width="isCollapse ? '64px' : '200px'" class="aside-container">
		<ElMenu :collapse="isCollapse" :collapse-transition="false" class="h-full" router>
			<ElMenuItem v-for="item in menuItems" :key="item.index" :index="item.index">
				<ElIcon><component :is="item.icon" /></ElIcon>
				<template #title>{{ item.title }}</template>
			</ElMenuItem>
		</ElMenu>

		<div class="collapse-btn" @click="isCollapse = !isCollapse">
			<el-icon>
				<component :is="isCollapse ? 'Expand' : 'Fold'" />
			</el-icon>
		</div>
	</ElAside>
</template>

<style scoped>
.aside-container {
	position: relative;
	height: 100%;
	border-right: 1px solid #e5e7eb;
	background-color: white;
	transition: width 0.3s;
}

.collapse-btn {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	padding: 8px;
	cursor: pointer;
	background-color: #f3f4f6;
	border-radius: 4px;
}

:deep(.el-menu) {
	border-right: none;
}
</style>
