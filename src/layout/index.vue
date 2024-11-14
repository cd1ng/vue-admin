<script setup lang="ts">
import Header from './Header.vue'
</script>

<template>
	<ElContainer class="h-full">
		<ElHeader>
			<Header />
		</ElHeader>
		<ElContainer>
			<ElAside>Aside</ElAside>
			<ElMain>
				<RouterView />
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
