<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<ElContainer class="h-full">
		<ElHeader>Header</ElHeader>
		<ElContainer>
			<ElAside>Aside</ElAside>
			<ElMain>
				<RouterView />
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
