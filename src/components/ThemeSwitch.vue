<script setup>
import { useTheme } from '@/hooks'
import { Moon, Sunny } from '@element-plus/icons-vue'
const { theme, toggleTheme } = useTheme()
</script>

<template>
	<ElIcon :size="20" class="text-gray-800 dark:text-gray-200" @click="toggleTheme">
		<Sunny v-if="theme" />
		<Moon v-else />
	</ElIcon>
</template>
