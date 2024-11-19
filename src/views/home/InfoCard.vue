<script setup lang="ts">
import type { InfoData } from './types'

const props = defineProps<{
	infoData: InfoData[]
}>()
</script>

<template>
	<!-- 统计卡片 -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
		<div
			v-for="item in props.infoData"
			:key="item.title"
			class="p-4 rounded-lg bg-white shadow-sm"
			:style="{ backgroundColor: item.color }"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm">{{ item.title }}</p>
					<p class="text-2xl font-semibold mt-1">{{ item.value }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
