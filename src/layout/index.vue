<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
</script>

<template>
	<ElContainer class="h-screen overflow-hidden main-bg">
		<ElHeader>
			<Header />
		</ElHeader>
		<ElContainer>
			<Aside />
			<ElMain class="content-bg overflow-auto p-4">
				<RouterView v-slot="{ Component }">
					<KeepAlive :include="['HomePage', 'ListPage', 'RolePage', 'UserPage']">
						<component :is="Component" />
					</KeepAlive>
				</RouterView>
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
