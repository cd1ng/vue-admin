<script setup lang="ts">
import Title from './Title.vue'
import Tiptap from './Tiptap.vue'

const titleInfo = reactive({
	title: '新建文档',
	author: '作者',
	content: '编辑器测试内容'
})

// 处理标题输入
const handleTitleInput = (value: string) => {
	titleInfo.title = value
}

// 处理内容输入
const handleContentInput = (value: string) => {
	titleInfo.content = value
}
</script>

<template>
	<div class="card-bg h-full w-full">
		<Title :title="titleInfo.title" :author="titleInfo.author" @update-title="handleTitleInput" />
		<Tiptap :content="titleInfo.content" @update-content="handleContentInput" />
	</div>
</template>
