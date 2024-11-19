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
	<input :value="title" placeholder="请输入标题" class="h-10 w-full border-b border-gray-200" @input="handleInput" />
</template>
