<script lang="ts" setup>
import { userApi } from '@/http/user/api'

interface UserInfo {
	id: string
	name: string
	role: string
}

const tableData = ref<UserInfo[]>([])
onMounted(async () => {
	try {
		const data = await userApi.getList()
		tableData.value = data?.data || []
	} catch (error) {
		console.error(error)
		tableData.value = []
	}
})
</script>

<template>
	<ElTable :data="tableData">
		<ElTableColumn prop="userName" label="用户名" />
		<ElTableColumn prop="userId" label="用户Id" />
		<ElTableColumn prop="role" label="用户权限分组" />
	</ElTable>
</template>
