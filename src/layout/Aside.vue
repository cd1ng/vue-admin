<script setup lang="ts">
import { HomeFilled, EditPen, User, List, Expand, Fold, Histogram, Notification, Phone } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const route = useRoute()
// 获取当前路由
const activeMenu = computed(() => route.path)
const menuItems = [
	{
		icon: HomeFilled,
		title: '工作台',
		path: '/',
		children: []
	},
	{
		icon: List,
		title: '列表',
		path: '/list',
		children: [
			{
				icon: Histogram,
				title: '列表详情',
				path: '/list/detail'
			},
			{
				icon: Notification,
				title: '其他列表',
				path: '/list/others'
			}
		]
	},
	{
		icon: EditPen,
		title: '富文本编辑',
		path: '/editor',
		children: []
	},
	{
		icon: User,
		title: '权限管理',
		path: '/role',
		children: [
			{
				icon: Histogram,
				title: '用户组管理',
				path: '/role/group'
			},
			{
				icon: Notification,
				title: '用户管理',
				path: '/role/power'
			}
		]
	},
	{
		icon: Phone,
		title: '文章管理',
		path: '/article',
		children: []
	}
]
</script>

<template>
	<ElAside :width="isCollapse ? '64px' : '160px'" class="main-bg relative h-full select-none">
		<ElMenu :collapse="isCollapse" :collapse-transition="false" :default-active="activeMenu" class="main-bg h-full border-none" router>
			<template v-for="item in menuItems" :key="item.path">
				<!-- 没有子菜单的项目 -->
				<ElMenuItem v-if="!item.children.length" :index="item.path" class="text hover-bg">
					<ElIcon><component :is="item.icon" /></ElIcon>
					<template #title>{{ item.title }}</template>
				</ElMenuItem>
				<!-- 有子菜单的项目 -->
				<ElSubMenu v-else :index="item.path">
					<template #title>
						<ElIcon><component :is="item.icon" /></ElIcon>
						<span>{{ item.title }}</span>
					</template>

					<ElMenuItem v-for="child in item.children" :key="child.path" :index="child.path">
						<ElIcon><component :is="child.icon" /></ElIcon>
						<template #title>{{ child.title }}</template>
					</ElMenuItem>
				</ElSubMenu>
			</template>
		</ElMenu>
		<!-- 折叠按钮 -->
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

<style scoped>
/* 消除菜单边框 */
.el-menu {
	border-right-width: 0;
}
</style>
