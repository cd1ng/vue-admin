<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3'
// TODO: 第3方库定义，暂时使用any
defineProps<{ editor: any }>()
</script>

<template>
	<BubbleMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">
		<div class="bubble-menu">
			<button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">Bold</button>
			<button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">Italic</button>
			<button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">Strike</button>
		</div>
	</BubbleMenu>
</template>
