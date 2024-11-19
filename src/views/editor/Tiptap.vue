<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenu from './BubbleMenu.vue'

const props = withDefaults(defineProps<{ content?: string }>(), {
	content: '<p></p>'
})

const emit = defineEmits<{ 'update-content': [value: string] }>()

const editor = useEditor({
	content: props.content,
	extensions: [StarterKit],
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
