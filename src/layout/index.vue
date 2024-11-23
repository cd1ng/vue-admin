<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
</script>

<template>
	<ElContainer class="main-bg h-screen overflow-hidden">
		<ElHeader>
			<Header />
		</ElHeader>
		<ElContainer>
			<Aside />
			<ElMain class="content-bg overflow-auto p-4">
				<div class="flex h-[calc(100vh-100px)] w-full select-none flex-col">
					<RouterView v-slot="{ Component }">
						<KeepAlive :include="['HomePage', 'ListPage', 'RolePage', 'UserPage']">
							<component :is="Component" />
						</KeepAlive>
					</RouterView>
				</div>
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
