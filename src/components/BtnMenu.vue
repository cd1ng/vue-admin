<script setup lang="ts">
import { ref, type Component } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface MenuItem {
  icon: Component
  label?: string
  value: string
  isActive?: boolean
}

defineProps<{ items: MenuItem[], placement?: 'top' | 'bottom' | 'left' | 'right'}>()

const emit = defineEmits<{ select: [value: string] }>()

const isOpen = ref(false)
const menuRef = ref<HTMLDivElement>()

// 切换菜单显示状态
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// 处理选项点击
const handleSelectItem = (value: string) => {
  emit('select', value)
  isOpen.value = false
}

// 点击外部关闭菜单
onClickOutside(menuRef, () => {
  isOpen.value = false
})
</script>

<template>
	<div ref="menuRef" class="relative w-[32px] h-[32px]" >
		<!-- 触发按钮 -->
		<component :is="items[0].icon" :is-active="items[0].isActive" @click="toggleMenu" />
		<!-- 下拉菜单 -->
		<div
			v-show="isOpen"
			class="absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
			:class="{
				'top-full left-0': placement === 'bottom' || !placement,
				'bottom-full left-0': placement === 'top',
				'top-0 left-full': placement === 'right',
				'top-0 right-full': placement === 'left'
			}"
		>
			<div
				v-for="item in items.slice(1)"
				@click="handleSelectItem(item.value)"
				:key="item.value"
				:is-active="item.isActive"
				class="p-1 flex items-center justify-center w-[32px] h-[32px] rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
				:class="{ 'bg-purple-500 dark:bg-purple-600 text-white': item.isActive }"
			>
				<component :is="item.icon" class="w-[32px] h-[32px]" />
			</div>
		</div>
	</div>
</template>
