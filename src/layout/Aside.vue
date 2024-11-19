<script setup lang="ts">
import { HomeFilled, Document, EditPen, User, List, Expand, Fold } from '@element-plus/icons-vue'

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
		icon: Document,
		title: '文档管理',
		index: '/docs'
	},
	{
		icon: User,
		title: '权限管理',
		index: '/role'
	}
]
</script>

<template>
	<ElAside :width="isCollapse ? '64px' : '160px'" class="relative h-full bg-white">
		<ElMenu :collapse="isCollapse" :collapse-transition="false" class="h-full" router>
			<ElMenuItem v-for="item in menuItems" :key="item.index" :index="item.index">
				<ElIcon><component :is="item.icon" /></ElIcon>
				<template #title>{{ item.title }}</template>
			</ElMenuItem>
		</ElMenu>
		<div
			class="absolute cursor-pointer bg-gray-100 rounded-md bg-opacity-50 bottom-[20px] right-0 p-2"
			@click="isCollapse = !isCollapse"
		>
			<ElIcon>
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</ElIcon>
		</div>
	</ElAside>
</template>
