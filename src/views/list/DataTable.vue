<script setup lang="ts">
import type { TableItem, Status, TagType } from './types'

defineProps<{
	data: TableItem[]
	loading: boolean
	height: number
}>()

const emit = defineEmits<{
	edit: [item: TableItem]
	delete: [item: TableItem]
}>()

// 状态映射
const statusMap: Record<Status, [TagType, string]> = {
	Pending: ['warning', '待处理'],
	InProgress: ['primary', '进行中'],
	Done: ['success', '已完成']
}
</script>

<template>
	<ElCard>
		<template #header>
			<div class="flex justify-between items-center">
				<span>数据列表</span>
				<ElButton type="primary">新增</ElButton>
			</div>
		</template>

		<ElTable v-loading="loading" :data="data" :height="height" border>
			<ElTableColumn prop="id" label="ID" />
			<ElTableColumn prop="name" label="名称" />
			<ElTableColumn prop="status" label="状态">
				<template #default="{ row }">
					<ElTag :type="statusMap[row.status as Status][0]">
						{{ statusMap[row.status as Status][1] }}
					</ElTag>
				</template>
			</ElTableColumn>
			<ElTableColumn prop="date" label="日期" />
			<ElTableColumn prop="address" label="地址" />
			<ElTableColumn label="操作" width="200">
				<template #default="{ row }">
					<ElButton link type="primary" @click="emit('edit', row)">编辑</ElButton>
					<ElButton link type="danger" @click="emit('delete', row)">删除</ElButton>
				</template>
			</ElTableColumn>
		</ElTable>
	</ElCard>
</template>
