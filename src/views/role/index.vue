<script lang="ts" setup>
import { ROLE_STATUS } from '@/constant/role'
import { userApis } from '@/api/user'

import type { RoleType } from './types'
import type { UserInfo } from '@/api/user/type'

defineOptions({
	name: 'RolePage'
})

const loading = ref(true)
const tableData = ref<UserInfo[]>([])

const fetchData = async () => {
	loading.value = true
	try {
		const data = await userApis.getList()
		tableData.value = data?.data || []
	} catch (error) {
		console.error(error)
		tableData.value = []
	} finally {
		loading.value = false
	}
}
onMounted(() => {
	fetchData()
})
</script>

<template>
	<ElTable :loading="loading" :data="tableData" class="card-bg text select-none">
		<ElTableColumn prop="userName" label="用户名" />
		<ElTableColumn prop="userId" label="用户Id" />
		<ElTableColumn prop="role" label="用户权限" :formatter="(row) => ROLE_STATUS[row.role as RoleType]" />
	</ElTable>
</template>
