<script setup lang="ts">
import { HomeFilled, EditPen, User, List, Expand, Fold } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const menuItems = [
	{
		icon: HomeFilled,
		title: '工作台',
		index: '/'
	},
	{
		icon: List,
		title: '列表',
		index: '/list'
	},
	{
		icon: EditPen,
		title: '富文本编辑',
		index: '/editor'
	},
	{
		icon: User,
		title: '权限管理',
		index: '/role'
	}
]
</script>

<template>
	<ElAside :width="isCollapse ? '64px' : '160px'" class="main-bg relative h-full select-none">
		<ElMenu :collapse="isCollapse" :collapse-transition="false" class="main-bg h-full border-none" router>
			<ElMenuItem v-for="item in menuItems" :key="item.index" :index="item.index" class="text hover-bg">
				<ElIcon><component :is="item.icon" /></ElIcon>
				<template #title>{{ item.title }}</template>
			</ElMenuItem>
		</ElMenu>
		<div
			class="hover-bg absolute bottom-[20px] right-0 cursor-pointer rounded-md p-2 transition-colors"
			@click="isCollapse = !isCollapse"
		>
			<ElIcon class="text-gray-600 dark:text-gray-400">
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</ElIcon>
		</div>
	</ElAside>
</template>
