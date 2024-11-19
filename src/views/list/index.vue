<script setup lang="ts">
import { useResize } from '@/hooks/useResize'
import { listApi } from '@/http/list/api'
import SearchForm from './SearchForm.vue'
import DataTable from './DataTable.vue'

// 头部高度
const HEADER_HEIGHT = 60
// 表格搜索区域高度
const TABLE_SEARCH_HEIGHT = 150
// 分页高度
const PAGE_SIZE_HEIGHT = 200

// 表格数据
const tableData = ref<TableItem[]>([])
// 表格加载状态
const loading = ref(false)

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
		tableData.value = data as TableItem[] || []
	} catch (error) {
		console.error('列表渲染报错',error)
		tableData.value = []
	} finally {
		loading.value = false
	}
}

// 搜索处理
const handleSearch = () => {
	fetchData()
}

// 重置处理
const handleReset = () => {
	fetchData()
}

// 编辑处理
const handleEdit = (item: TableItem) => {
	console.log('编辑:', item)
}

// 删除处理
const handleDelete = (item: TableItem) => {
	console.log('删除:', item)
}

onMounted(() => {
	fetchData()
})
</script>

<template>
	<div class="p-6">
		<SearchForm 
			:loading="loading"
			@search="handleSearch"
			@reset="handleReset"
		/>
		<DataTable
			:data="tableData"
			:loading="loading"
			:height="tableHeight"
			@edit="handleEdit"
			@delete="handleDelete"
		/>
	</div>
</template>
