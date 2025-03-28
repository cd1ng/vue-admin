<script lang="ts" setup>
import { powerApis } from '@/api/power'

// 获取默认表单数据
const getDefaultForm = () => ({
	id: '',
	name: '',
	powerList: [
		{
			id: 'blog_article',
			name: '文章',
			power: [] as string[],
			powerMap: {
				view: false,
				change: false,
				add: false,
				delete: false
			}
		},
		{
			id: 'blog_userinfo',
			name: '用户信息',
			power: [] as string[],
			powerMap: {
				view: false,
				change: false,
				add: false,
				delete: false
			}
		}
	]
})

export interface UserGroup {
	id: string
	/** 用户组名称 */
	name: string
	power: {
		id: string
		name: string
		power: string[]
	}
}

defineOptions({
	name: 'GroupPage'
})

// 加载状态
const loading = ref(true)
// 当前状态
const currentStatus = ref('')
// 弹窗控制逻辑
const dialogVisible = ref(false)
// 列表数据
const tableData = ref<UserGroup[]>([])
// 表单数据
const form = ref(getDefaultForm())

/**
 * 编辑用户组
 * @param rowData
 */
const handleEdit = (rowData: any) => {
	currentStatus.value = 'change'
	const curData = getDefaultForm()
	curData.id = rowData.id
	curData.name = rowData.name
	curData.powerList.forEach((ele: any) => {
		const curId = ele.id
		const curPower = rowData.powerList.find((power: any) => power.id === curId)
		if (curPower) {
			ele.power = [...curPower.power]
			// 更新 powerMap 以反映 power 数组
			ele.powerMap.view = ele.power.includes('view')
			ele.powerMap.change = ele.power.includes('change')
			ele.powerMap.add = ele.power.includes('add')
			ele.powerMap.delete = ele.power.includes('delete')
		}
	})
	form.value = curData
	dialogVisible.value = true
}

/**
 * 删除用户组
 * @param rowData
 */
const handleDelete = async (rowData: any) => {
	await powerApis.deleteGroups(rowData.name)
	fetchData()
}

/**
 * 获取全部用户组数据
 */
const fetchData = async () => {
	loading.value = true
	try {
		const data = await powerApis.getGroups()
		tableData.value = data as UserGroup[]
	} catch (error) {
		console.error(error)
		tableData.value = []
	} finally {
		loading.value = false
	}
}

/**
 * 创建新用户组
 */
const handleAddGroup = async () => {
	try {
		// 新增用户组
		if (currentStatus.value === 'new') {
			await powerApis.createrGroup(
				form.value.name,
				form.value.powerList
					.map((item: any) => {
						const [tableStr, featureStr] = item.id.split('_')
						return item.power.map((power_item: any) => `${tableStr}.${power_item}_${featureStr}`)
					})
					.flat(1)
			)
			ElMessage.error('创建用户组成功')
		}
		// 修改用户组逻辑
		else if (currentStatus.value === 'change') {
			await powerApis.changeUserGroup(
				form.value.id,
				form.value.name,
				form.value.powerList
					.map((item: any) => {
						const [tableStr, featureStr] = item.id.split('_')
						return item.power.map((power_item: any) => `${tableStr}.${power_item}_${featureStr}`)
					})
					.flat(1)
			)
			ElMessage.error('修改用户组成功')
		}
	} catch (error) {
		if (currentStatus.value === 'new') {
			console.error('创建用户组失败:', error)
			ElMessage.error('创建用户组失败')
		} else if (currentStatus.value === 'change') {
			console.error('修改用户组失败:', error)
			ElMessage.error('修改用户组失败')
		}
	}
	dialogVisible.value = false
	form.value = getDefaultForm()
	fetchData()
}

/**
 * 打开新用户组弹窗
 */
const createNewUsrDialog = () => {
	dialogVisible.value = true
	currentStatus.value = 'new'
	form.value = getDefaultForm()
}

/**
 * 更新权限选项
 */
const updatePower = (id: string, powerType: string, checked: any) => {
	const index = form.value.powerList.findIndex((item: any) => item.id === id)
	if (index !== -1) {
		// 更新 power 数组，确保与 powerMap 同步
		const powerArray = form.value.powerList[index].power
		const powerIndex = powerArray.indexOf(powerType)

		if (checked && powerIndex === -1) {
			powerArray.push(powerType)
		} else if (!checked && powerIndex !== -1) {
			powerArray.splice(powerIndex, 1)
		}
	}
}

onMounted(() => {
	fetchData()
})
</script>

<template>
	<ElButton type="primary" class="w-[100px]" @click="createNewUsrDialog">新增用户组</ElButton>
	<ElDialog v-model="dialogVisible" :title="currentStatus === 'new' ? '新增用户组' : '编辑用户组'" width="500">
		<template #footer>
			<ElForm :model="form" label-width="auto" style="max-width: 600px">
				<ElFormItem label="名称">
					<ElInput v-model="form.name" />
				</ElFormItem>
				<ElFormItem v-for="item in form.powerList" :key="item.id" :label="item.name">
					<ElCheckbox v-model="item.powerMap.view" label="查看" @change="(val) => updatePower(item.id, 'view', val)" />
					<ElCheckbox v-model="item.powerMap.change" label="编辑" @change="(val) => updatePower(item.id, 'change', val)" />
					<ElCheckbox v-model="item.powerMap.add" label="新增" @change="(val) => updatePower(item.id, 'add', val)" />
					<ElCheckbox v-model="item.powerMap.delete" label="删除" @change="(val) => updatePower(item.id, 'delete', val)" />
				</ElFormItem>
				<ElFormItem>
					<ElButton type="primary" @click="handleAddGroup">创建</ElButton>
					<ElButton @click="dialogVisible = false">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</template>
	</ElDialog>
	<ElTable :loading="loading" :data="tableData" class="card-bg text select-none">
		<ElTableColumn prop="name" label="用户组" />
		<ElTableColumn label="操作">
			<template #default="scope">
				<ElButton size="small" @click="handleEdit(scope.row)">编辑</ElButton>
				<ElButton size="small" type="danger" @click="handleDelete(scope.row)">删除</ElButton>
			</template>
		</ElTableColumn>
	</ElTable>
</template>
