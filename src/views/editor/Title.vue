<script setup lang="ts">
interface TitleProps {
	title?: string
	author?: string
}

withDefaults(defineProps<TitleProps>(), {
	title: '新建文档',
	author: '作者'
})

const emit = defineEmits<{ 'update-title': [value: string] }>()

const handleInput = (e: Event) => {
	const title = (e.target as HTMLInputElement).value
	emit('update-title', title)
}
</script>

<template>
	<input
		:value="title"
		placeholder="请输入标题"
		class="flex-shrink-0 w-full font-bold text-2xl px-4 h-14 whitespace-nowrap overflow-hidden text-ellipsis border-b outline-none"
		@input="handleInput"
	/>
</template>
