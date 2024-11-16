<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
</script>

<template>
	<ElContainer class="h-screen">
		<ElHeader>
			<Header />
		</ElHeader>
		<ElContainer>
			<Aside />
			<ElMain class="bg-gray-100">
				<RouterView />
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>

<style scoped>
:deep(.el-container) {
	height: 100%;
}
</style>
