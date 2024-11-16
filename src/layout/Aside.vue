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
		title: '文档管理',
		index: '/documents'
	},
	{
		icon: Setting,
		title: '系统设置',
		index: '/settings'
	}
]
</script>

<template>
	<ElAside :width="isCollapse ? '64px' : '200px'" class="aside-container">
		<el-menu :collapse="isCollapse" :collapse-transition="false" class="h-full" router>
			<el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
				<el-icon><component :is="item.icon" /></el-icon>
				<template #title>{{ item.title }}</template>
			</el-menu-item>
		</el-menu>

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
