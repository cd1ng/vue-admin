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
				<RouterView v-slot="{ Component }">
					<KeepAlive :include="['HomePage', 'ListPage', 'RolePage', 'UserPage']">
						<component :is="Component" />
					</KeepAlive>
				</RouterView>
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
