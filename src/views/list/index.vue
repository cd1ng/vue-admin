<script setup lang="ts">
import { ref, reactive } from 'vue'

interface TableItem {
	id: number
	name: string
	status: string
	date: string
	address: string
}

// 搜索表单
const searchForm = reactive({
	name: '',
	status: '',
	date: ''
})

// 表格数据
const tableData = ref<TableItem[]>([
	{
		id: 1,
		name: '张三',
		status: '已完成',
		date: '2024-03-20',
		address: '北京市朝阳区'
	},
	{
		id: 2,
		name: '李四',
		status: '进行中',
		date: '2024-03-21',
		address: '上海市浦东新区'
	}
])

// 表格加载状态
const loading = ref(false)

// 分页配置
const pagination = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 100
})

// 搜索方法
const handleSearch = () => {
	loading.value = true
	// 这里添加实际的搜索逻辑
	setTimeout(() => {
		loading.value = false
	}, 500)
}

// 重置搜索
const resetSearch = () => {
	Object.assign(searchForm, {
		name: '',
		status: '',
		date: ''
	})
}

// 分页变化
const handlePageChange = (val: number) => {
	pagination.currentPage = val
	handleSearch()
}
</script>

<template>
	<div class="p-6">
		<!-- 搜索区域 -->
		<ElCard class="mb-4">
			<ElForm :model="searchForm" label-width="80px" inline>
				<ElFormItem label="名称">
					<el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
				</ElFormItem>
				<ElFormItem label="状态">
					<ElSelect v-model="searchForm.status" placeholder="请选择状态" clearable>
						<ElOption label="已完成" value="completed" />
						<ElOption label="进行中" value="processing" />
					</ElSelect>
				</ElFormItem>
				<ElFormItem label="日期">
					<ElDatePicker v-model="searchForm.date" type="date" placeholder="选择日期" clearable />
				</ElFormItem>
				<ElFormItem>
					<ElButton type="primary" @click="handleSearch">搜索</ElButton>
					<ElButton @click="resetSearch">重置</ElButton>
				</ElFormItem>
			</ElForm>
		</ElCard>

		<!-- 表格区域 -->
		<ElCard>
			<template #header>
				<div class="flex justify-between items-center">
					<span>数据列表</span>
					<ElButton type="primary">新增</ElButton>
				</div>
			</template>

			<ElTable v-loading="loading" :data="tableData" border>
				<ElTableColumn prop="id" label="ID" width="80" />
				<ElTableColumn prop="name" label="名称" />
				<ElTableColumn prop="status" label="状态">
					<template #default="{ row }">
						<el-tag :type="row.status === '已完成' ? 'success' : 'warning'">
							{{ row.status }}
						</el-tag>
					</template>
				</ElTableColumn>
				<ElTableColumn prop="date" label="日期" />
				<ElTableColumn prop="address" label="地址" />
				<ElTableColumn label="操作" width="200">
					<template #default>
						<el-button link type="primary">编辑</el-button>
						<el-button link type="danger">删除</el-button>
					</template>
				</ElTableColumn>
			</ElTable>

			<!-- 分页 -->
			<div class="flex justify-end mt-4">
				<ElPagination
					v-model:current-page="pagination.currentPage"
					:page-size="pagination.pageSize"
					:total="pagination.total"
					@current-change="handlePageChange"
				/>
			</div>
		</ElCard>
	</div>
</template>
