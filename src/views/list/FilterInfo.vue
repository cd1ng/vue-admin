<script setup lang="ts">
import { throttle } from 'lodash-es'
import { STATUS_CONFIG } from '@/constant/list'
import type { FilterInfoState } from './types'

const props = defineProps<{
	loading: boolean
}>()

// 自行维护过滤状态
const filterInfo = reactive<FilterInfoState>({
	name: '',
	status: '',
	date: ''
})

const emit = defineEmits<{
	search: [FilterInfoState]
	reset: []
}>()

// 重置处理
const handleReset = throttle(() => {
	Object.assign(filterInfo, {
		name: '',
		status: '',
		date: ''
	})
	emit('reset')
}, 200)

// 搜索处理
const handleSearch = throttle(() => {
	emit('search', filterInfo)
}, 200)
</script>

<template>
	<ElCard class="card-bg text mb-4">
		<ElForm :model="filterInfo" label-width="40px">
			<!-- 采用grid自适应布局，根据屏幕大小自动调整列数 -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<ElFormItem label="名称">
					<ElInput v-model="filterInfo.name" placeholder="请输入名称" clearable />
				</ElFormItem>
				<ElFormItem label="状态">
					<ElSelect v-model="filterInfo.status" placeholder="请选择状态" clearable class="w-full">
						<ElOption v-for="item in STATUS_CONFIG" :key="item.type" :label="item.label" :value="item.value" />
					</ElSelect>
				</ElFormItem>
				<ElFormItem label="日期">
					<ElDatePicker v-model="filterInfo.date" type="date" placeholder="选择日期" clearable class="w-full" />
				</ElFormItem>
				<ElFormItem class="flex justify-end">
					<ElButton :loading="props.loading" type="primary" @click="handleSearch">搜索</ElButton>
					<ElButton class="ml-2" @click="handleReset">重置</ElButton>
				</ElFormItem>
			</div>
		</ElForm>
	</ElCard>
</template>
