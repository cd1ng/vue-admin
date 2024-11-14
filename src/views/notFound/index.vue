<script setup lang="ts">
const router = useRouter()

const goHome = () => {
	router.push('/')
}

const goBack = () => {
	router.back()
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="text-center">
			<h1 class="text-9xl font-bold text-gray-200">404</h1>

			<div class="mt-4">
				<h3 class="text-2xl font-semibold text-gray-700">页面未找到</h3>
				<p class="mt-2 text-gray-500">抱歉，您访问的页面不存在或已被移除</p>
			</div>

			<div class="mt-8 space-x-4">
				<ElButton type="primary" @click="goHome"> 返回首页 </ElButton>
				<ElButton @click="goBack"> 返回上页 </ElButton>
			</div>
		</div>
	</div>
</template>
