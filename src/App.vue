<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<ElContainer class="h-full">
		<ElHeader>Header</ElHeader>
		<ElMain>
			<RouterView />
		</ElMain>
	</ElContainer>
</template>
