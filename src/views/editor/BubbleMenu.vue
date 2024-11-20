<script setup lang="ts">
import { HomeFilled, EditPen, List } from '@element-plus/icons-vue'
import { BubbleMenu } from '@tiptap/vue-3'
// TODO: 第3方库定义，暂时使用any
const props = defineProps<{ editor: any }>()

const placement = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')

// 1. 首先定义基础配置
const alignConfig = [
  { icon: HomeFilled, value: 'left', label: '左对齐' },
  { icon: EditPen, value: 'center', label: '居中对齐' },
  { icon: List, value: 'right', label: '右对齐' }
]

// 2. 使用 computed 来动态计算激活状态
const textAlignItems = computed(() => {
  if (!props.editor) {
    return alignConfig.map(item => ({ ...item, isActive: false }))
  }
  
  return alignConfig.map(item => ({
    ...item,
    isActive: props.editor.isActive({ textAlign: item.value })
  }))
})

// 3. 不再需要 updateActiveStates 函数
const handleTextAlignSelect = (value: string) => {
  props.editor.chain().focus().setTextAlign(value).run()
}
</script>

<template>
	<BubbleMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">
		<div class="bubble-menu">
			<BtnMenu :items="textAlignItems" :placement="placement" @select="handleTextAlignSelect" />
			<!-- <BtnMenu :items="textAlignItems" :placement="placement" @select="handleTextAlignSelect" /> -->
			<!-- <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">Bold</button>
			<button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">Italic</button>
			<button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">Strike</button>
			<button
				:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
				@click="editor.chain().focus().setTextAlign('left').run()"
			>
				Left
			</button> -->
			<!-- <button
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
			<button @click="editor.chain().focus().unsetTextAlign().run()">Unset</button> -->
		</div>
	</BubbleMenu>
</template>
