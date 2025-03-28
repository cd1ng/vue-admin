<script lang="ts" setup>
import { powerApis } from '@/api/power'
import { UserGroup } from './group.vue'
import { ElMessage } from 'element-plus'

// 获取默认表单数据
const getDefaultForm = () => ({
	id: '',
	username: '',
	groupName: ''
})

export interface UserForm {
	id: string
	/** 用户组名称 */
	username: string
	groupName: string
}

defineOptions({
	name: 'PowerPage'
})

// 加载状态
const loading = ref(true)
// 弹窗控制逻辑
const dialogVisible = ref(false)
// 列表数据
const tableData = ref<UserForm[]>([])
// 用户组数据
const groupData = ref<UserGroup[]>([])
// 表单数据
const form = ref<UserForm>({
	id: '',
	username: '',
	groupName: ''
})

/**
 * 编辑用户组
 * @param rowData
 */
const handleEdit = (row: UserForm) => {
	form.value = {
		id: row.id,
		username: row.username,
		groupName: row.groupName || ''
	}
	dialogVisible.value = true
}

/**
 * 删除用户组
 * @param rowData
 */
const handleDelete = async (rowData: any) => {
	await powerApis.deleteUser(rowData.id)
	fetchData()
}

/**
 * 获取全部用户组数据
 */
const fetchGroupData = async () => {
	try {
		const data = await powerApis.getGroups()
		groupData.value = data as UserGroup[]
	} catch (error) {
		console.error('获取用户组数据失败:', error)
		groupData.value = []
	}
}

/**
 * 获取用户列表数据
 */
const fetchData = async () => {
	loading.value = true
	try {
		const data = await powerApis.getUser()
		tableData.value = data as UserForm[]
	} catch (error) {
		console.error(error)
		tableData.value = []
	} finally {
		loading.value = false
	}
}

/**
 * 改变用户信息
 */
const handleChangeUser = async () => {
	try {
		await powerApis.updateUser(form.value.id, form.value.username, form.value.groupName)
		ElMessage.success('修改成功')
		dialogVisible.value = false
		form.value = getDefaultForm()
		fetchData()
	} catch (error) {
		console.error('修改用户组失败:', error)
		ElMessage.error('修改失败')
	}
}

onMounted(async () => {
	await Promise.all([fetchData(), fetchGroupData()])
})
</script>

<template>
	<ElDialog v-model="dialogVisible" title="编辑用户" width="500">
		<template #footer>
			<ElForm :model="form" label-width="auto" style="max-width: 600px">
				<ElFormItem label="用户名称">
					<ElInput v-model="form.username" />
				</ElFormItem>
				<ElFormItem label="用户组">
					<ElSelect v-model="form.groupName" placeholder="请选择用户组">
						<ElOption v-for="item in groupData" :key="item.id" :label="item.name" :value="item.name" />
					</ElSelect>
				</ElFormItem>
				<ElFormItem>
					<ElButton type="primary" @click="handleChangeUser">修改</ElButton>
					<ElButton @click="dialogVisible = false">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</template>
	</ElDialog>
	<ElTable :loading="loading" :data="tableData" class="card-bg text select-none">
		<ElTableColumn prop="username" label="用户" />
		<ElTableColumn prop="group" label="用户组" />
		<ElTableColumn label="操作">
			<template #default="scope">
				<ElButton size="small" @click="handleEdit(scope.row)">编辑</ElButton>
				<ElButton size="small" type="danger" @click="handleDelete(scope.row)">删除</ElButton>
			</template>
		</ElTableColumn>
	</ElTable>
</template>
