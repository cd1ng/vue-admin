<script setup lang="ts">
import { STATUS_CONFIG } from '@/constant/list'
import type { TableItem } from './types'

defineProps<{
	data: TableItem[]
	loading: boolean
	height: number
}>()

const emit = defineEmits<{
	// 列表新增
	add: []
	// 列表编辑
	edit: [item: TableItem]
	// 列表项删除
	delete: [item: TableItem]
	// 列表项复制
	'copy-info': [item: TableItem]
}>()
</script>

<template>
	<ElCard class="card-bg text">
		<template #header>
			<div class="flex justify-between items-center select-none">
				<span>数据列表</span>
				<ElButton type="primary" @click="emit('add')">新增</ElButton>
			</div>
		</template>

		<ElTable v-loading="loading" :data="data" :height="height" class="card-bg text" border>
			<ElTableColumn prop="id" label="ID" />
			<ElTableColumn prop="name" label="名称" />
			<ElTableColumn prop="status" label="状态">
				<template #default="{ row }">
					<ElTag :type="STATUS_CONFIG[row.status].type">
						{{ STATUS_CONFIG[row.status].label }}
					</ElTag>
				</template>
			</ElTableColumn>
			<ElTableColumn prop="date" label="日期" />
			<ElTableColumn prop="address" label="地址" />
			<ElTableColumn label="操作" width="200">
				<template #default="{ row }">
					<ElButton link type="primary" @click="emit('edit', row)">编辑</ElButton>
					<ElButton link type="danger" @click="emit('delete', row)">删除</ElButton>
					<ElButton link type="info" @click="emit('copy-info', row)">复制</ElButton>
				</template>
			</ElTableColumn>
		</ElTable>
	</ElCard>
</template>
