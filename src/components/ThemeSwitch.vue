<script setup>
import { useTheme } from '@/hooks'
import { Moon, Sunny } from '@element-plus/icons-vue'
const { theme, toggleTheme } = useTheme()
</script>

<template>
	<ElIcon :size="20" class="main-bg cursor-pointer" @click="toggleTheme">
		<Moon v-if="theme" />
		<Sunny v-else />
	</ElIcon>
</template>
