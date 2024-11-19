<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import BubbleMenu from './BubbleMenu.vue'
import TextAlign from '@tiptap/extension-text-align'

const props = withDefaults(defineProps<{ content?: string }>(), {
	content: ''
})

const emit = defineEmits<{ 'update-content': [value: string] }>()

const editor = useEditor({
	content: props.content,
	extensions: [
		StarterKit,
		// 文本对齐
		TextAlign.configure({
			types: ['heading', 'paragraph']
		})
	],
	onUpdate: ({ editor }) => {
		emit('update-content', editor.getHTML())
	},
	editorProps: {
		attributes: {
			class: 'p-4 w-full h-full focus:outline-none card-bg'
		}
	}
})
</script>

<template>
	<EditorContent :editor="editor" />
	<BubbleMenu :editor="editor" />
</template>

<style lang="scss">
/* Basic editor styles */
.ProseMirror,
.tiptap {
	:first-child {
		margin-top: 0;
	}
	/* Heading styles */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
		margin-top: 0.5rem;
		text-wrap: pretty;
	}

	h1,
	h2 {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 1.4rem !important;
	}

	h2 {
		font-size: 1.2rem !important;
	}

	h3 {
		font-size: 1.1rem !important;
	}

	h4,
	h5,
	h6 {
		font-size: 1rem;
	}
	// 引用样式
	blockquote {
		border-left: 3px solid black;
		margin: 1.5rem 0;
		padding-left: 1rem;
	}

	/* List styles */
	ul,
	ol {
		padding: 0 1rem;
		margin: 1.25rem 1rem 1.25rem 0.4rem;
		li p {
			margin-top: 0.25em;
			margin-bottom: 0.25em;
		}
	}
	// 列表样式被Tailwind重置，这里重新设置
	ul {
		list-style-type: disc;
	}
	ol {
		list-style-type: decimal;
	}

	// 代码块样式
	pre {
		background: black;
		border-radius: 0.5rem;
		color: white;
		font-family: 'JetBrainsMono', monospace;
		margin: 1.5rem 0;
		padding: 0.75rem 1rem;

		code {
			background: none;
			color: inherit;
			font-size: 0.8rem;
			padding: 0;
		}
	}
}
</style>
