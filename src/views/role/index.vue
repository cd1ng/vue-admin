<script lang="ts" setup>
import { userApi } from '@/http/user/api'

defineOptions({
	name: 'RolePage'
})

interface UserInfo {
	token: string
	username: string
	role: string
	image: string
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
	<ElTable :data="tableData" class="card-bg text">
		<ElTableColumn prop="userName" label="用户名" />
		<ElTableColumn prop="userId" label="用户Id" />
		<ElTableColumn prop="role" label="用户权限分组" />
	</ElTable>
</template>
