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
			<button
				:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
				@click="editor.chain().focus().setTextAlign('left').run()"
			>
				Left
			</button>
			<button
				:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
				@click="editor.chain().focus().setTextAlign('center').run()"
			>
				Center
			</button>
			<button
				:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
				@click="editor.chain().focus().setTextAlign('right').run()"
			>
				Right
			</button>
			<button
				:class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
				@click="editor.chain().focus().setTextAlign('justify').run()"
			>
				Justify
			</button>
			<button @click="editor.chain().focus().unsetTextAlign().run()">Unset</button>
		</div>
	</BubbleMenu>
</template>
