<script lang="ts" setup>
import { ROLE_STATUS } from '@/constant/role'
import { userApis } from '@/api/user'
import type { RoleType } from './types'

defineOptions({
	name: 'RolePage'
})

interface UserInfo {
	token: string
	username: string
	role: string
	image: string
}
const loading = ref(false)
const tableData = ref<UserInfo[]>([])
onMounted(async () => {
	try {
		loading.value = true
		const data = await userApis.getList()
		tableData.value = data?.data || []
	} catch (error) {
		loading.value = false
		console.error(error)
		tableData.value = []
	} finally {
		loading.value = false
	}
})
</script>

<template>
	<ElTable :loading="loading" :data="tableData" class="card-bg text select-none">
		<ElTableColumn prop="userName" label="用户名" />
		<ElTableColumn prop="userId" label="用户Id" />
		<ElTableColumn prop="role" label="用户权限" :formatter="(row) => ROLE_STATUS[row.role as RoleType]" />
	</ElTable>
</template>
