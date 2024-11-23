<script setup lang="ts">
import type { InfoData } from './types'

const props = defineProps<{
	infoData: InfoData[] | undefined
}>()
</script>

<template>
	<!-- 统计卡片 -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		<div
			v-for="item in props.infoData"
			:key="item.title"
			class="rounded-lg bg-white p-4 shadow-sm"
			:style="{ backgroundColor: item.color }"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-gray-500">{{ item.title }}</p>
					<p class="mt-1 text-2xl font-semibold">{{ item.value }}</p>
				</div>
			</div>
		</div>
		<div v-if="props.infoData === undefined">
			<ElEmpty description="暂无数据" />
		</div>
	</div>
</template>
