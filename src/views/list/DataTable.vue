<script setup lang="ts">
import { STATUS_CONFIG } from '@/constant/list'
import type { TableItem } from './types'
import type { TableInstance } from 'element-plus'

const props = defineProps<{
	data: TableItem[]
	loading: boolean
	height: number
}>()

// 表格ref
const tableRef = ref<TableInstance>()
// 当前分页数量
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)

// 计算当前页数据
const currentPageData = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value
	const end = start + pageSize.value
	return props.data.slice(start, end)
})

// 页码改变
const handleCurrentChange = (page: number) => {
	currentPage.value = page
	// 等待下一次的DOM更新后，再执行回调函数。
	nextTick(() => {
		tableRef.value?.setScrollTop(0)
	})
}

// 每页条数改变
const handleSizeChange = (size: number) => {
	pageSize.value = size
	// 重置到第一页
	currentPage.value = 1
	// DOM更新是异步的，使用 nextTick 确保 DOM 更新后再滚动，直接调用setScrollTop会导致滚动失败
	nextTick(() => {
		tableRef.value?.setScrollTop(0)
	})
}

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

		<ElTable ref="tableRef" v-loading="loading" :data="currentPageData" :height="height" class="card-bg text" border>
			<ElTableColumn prop="id" label="ID" show-overflow-tooltip />
			<ElTableColumn prop="name" label="名称" width="120" />
			<ElTableColumn prop="status" label="状态" width="90">
				<template #default="{ row }">
					<ElTag :type="STATUS_CONFIG[row.status].type">
						{{ STATUS_CONFIG[row.status].label }}
					</ElTag>
				</template>
			</ElTableColumn>
			<ElTableColumn prop="date" label="日期" show-overflow-tooltip width="120" />
			<ElTableColumn prop="address" label="地址" show-overflow-tooltip />
			<ElTableColumn label="操作" width="160">
				<template #default="{ row }">
					<ElButton link type="primary" @click="emit('edit', row)">编辑</ElButton>
					<ElButton link type="danger" @click="emit('delete', row)">删除</ElButton>
					<ElButton link type="info" @click="emit('copy-info', row)">复制</ElButton>
				</template>
			</ElTableColumn>
		</ElTable>
		<div class="flex justify-end mt-4">
			<ElPagination
				v-if="data.length > 0"
				:current-page="currentPage"
				:page-size="pageSize"
				:page-sizes="[10, 20, 30, 50]"
				:total="data.length"
				layout="sizes, prev, pager, next"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</ElCard>
</template>
