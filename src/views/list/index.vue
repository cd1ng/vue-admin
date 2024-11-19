<script setup lang="ts">
import { useResize } from '@/hooks'
import { listApi } from '@/http/list/api'
import { useCopy } from '@/hooks'
import FilterInfo from './FilterInfo.vue'
import DataTable from './DataTable.vue'

import { HEADER_HEIGHT, TABLE_SEARCH_HEIGHT, PAGE_SIZE_HEIGHT } from '@/constant/list'

import type { FilterInfoState, TableItem } from './types'

defineOptions({
	name: 'ListPage'
})

// 表格数据
const tableData = ref<TableItem[]>([])
// 过滤信息
const filterInfo = reactive<FilterInfoState>({
	name: '',
	status: '',
	date: ''
})
// 表格加载状态
const loading = ref(false)
// 文本复制
const { copyText } = useCopy()

// 计算页面高度
const { windowHeight } = useResize()
// 计算表格高度
const tableHeight = computed(() => {
	return windowHeight.value - HEADER_HEIGHT - TABLE_SEARCH_HEIGHT - PAGE_SIZE_HEIGHT
})

// 获取数据
const fetchData = async () => {
	loading.value = true
	try {
		const { data } = await listApi.getDataList()
		tableData.value = (data as TableItem[]) || []
	} catch (error) {
		tableData.value = []
		console.error('列表渲染报错', error)
	} finally {
		loading.value = false
	}
}

// 搜索处理
const handleSearch = (value: FilterInfoState) => {
	Object.assign(filterInfo, value)
	fetchData()
}

// 重置处理
const handleReset = () => {
	Object.assign(filterInfo, {
		name: '',
		status: '',
		date: ''
	})
	fetchData()
}

// 编辑处理
const handleEdit = (item: TableItem) => {
	console.log('编辑:', item)
	ElMessage.warning('暂不支持编辑操作')
}

// 删除处理
const handleDelete = (item: TableItem) => {
	console.log('删除:', item)
	ElMessage.warning('暂不支持删除操作')
}

// 复制处理
const handleCopyInfo = (item: TableItem) => {
	const text = Object.values(item).join(',')
	copyText(text)
}

// 新增处理
const handleAdd = () => {
	fetchData()
}

const listData = computed(() => {
	return tableData.value.filter((item) => {
		// 解构item,处理为undef
		const { status = '', name = '', date = '' } = item
		// 所有条件为空时返回全部数据
		if (status === '' && name === '' && date === '') return true
		// 构建过滤条件数组
		const conditions = [
			{ value: status, fn: () => item.status === status },
			{ value: name, fn: () => item.name.includes(name) },
			{ value: date, fn: () => item.date.includes(date) }
		]
		// 只执行值不为空字符串的过滤条件
		return conditions.filter((condition) => condition.value !== '').every((condition) => condition.fn())
	})
})

onMounted(() => {
	fetchData()
})
</script>

<template>
	<FilterInfo :loading="loading" @search="handleSearch" @reset="handleReset" />
	<DataTable
		:data="listData"
		:loading="loading"
		:height="tableHeight"
		@add="handleAdd"
		@edit="handleEdit"
		@delete="handleDelete"
		@copy-info="handleCopyInfo"
	/>
</template>
