<template>
	<svg :width="width" :height="height" viewBox="0 0 200 50" :class="['select-none', className]" xmlns="http://www.w3.org/2000/svg">
		<!-- Admin 文字 -->
		<text x="5" y="35" class="text-3xl font-bold" style="font-family: 'Arial', sans-serif">
			<tspan fill="#1e293b" class="dark:fill-white">Admin</tspan>
			<tspan x="105" fill="#0ea5e9" class="text-2xl dark:fill-sky-400">Pro</tspan>
		</text>
		<!-- 底部装饰线 -->
		<path d="M0 40h150" stroke="currentColor" stroke-width="0.5" class="opacity-20" />
	</svg>
</template>

<script setup lang="ts">
interface LogoProps {
	width?: number | string
	height?: number | string
	className?: string
}

withDefaults(defineProps<LogoProps>(), {
	width: 200,
	height: 50,
	className: ''
})
</script>
