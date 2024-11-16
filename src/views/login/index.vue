<script setup lang="ts">
import { ElMessage, ElLoading } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

import { authApi } from '@/http/auth/api'
import { useUserInfoStore } from '@/store/userInfo'
// 导入 Element Plus 的类型定义
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

// 定义表单数据的类型接口
interface RuleForm {
	name: string
	password: string
}

// 设置表单尺寸
const formSize = ref<ComponentSize>('default')
// 表单实例的引用，用于表单验证和重置
const ruleFormRef = ref<FormInstance>()
// 用户信息表单数据
const userInfo = reactive({
	name: '',
	password: ''
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
	name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' },
		{ min: 3, max: 5, message: '长度限制从3位到5位', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 15, message: '长度限制从6位到15位', trigger: 'blur' }
	]
})

// 重置表单方法
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
const router = useRouter()

const store = useUserInfoStore()
const { setUserInfo } = store
// 提交表单方法
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return

	try {
		// 先进行表单验证
		await formEl.validate()

		// 显示加载状态
		const loading = ElLoading.service({
			lock: true,
			text: '登录中...',
			background: 'rgba(0, 0, 0, 0.7)'
		})

		try {
			// 调用登录接口
			const res = await authApi.login(userInfo.name, userInfo.password)
			const { username, token, role, image } = res.data as { username: string; token: string; role: string; image: string }

			// 保存用户信息到 store 和 localStorage
			setUserInfo({ username, token, role, image })
			ElMessage.success('登录成功')
			router.push('/')
		} catch (error) {
			ElMessage.error('登录失败：' + (error as Error).message)
		} finally {
			loading.close()
		}
	} catch (formError) {
		console.error('表单验证失败:', formError)
	}
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100">
		<!-- 登录表单组件 -->
		<ElForm
			ref="ruleFormRef"
			label-width="auto"
			:size="formSize"
			:model="userInfo"
			:rules="rules"
			class="w-[90%] min-w-[300px] max-w-[500px] p-6 bg-white rounded-lg shadow-md"
			status-icon
		>
			<!-- 标题 -->
			<h2 class="text-2xl font-bold text-center mb-6 text-gray-800">用户登录</h2>
			<!-- 用户名输入项 -->
			<!-- prop 属性用于表单验证，指定该项的验证规则 -->
			<ElFormItem prop="name" label-position="left" label-width="80px">
				<template #label>
					<span class="text-gray-600">用户名</span>
				</template>
				<ElInput v-model="userInfo.name" placeholder="请输入用户名" :prefix-icon="User" class="w-full" />
			</ElFormItem>
			<!-- 密码输入项 -->
			<ElFormItem prop="password" label-position="left" label-width="80px">
				<template #label>
					<span class="text-gray-600">密码</span>
				</template>
				<ElInput v-model="userInfo.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" class="w-full" />
			</ElFormItem>
			<!-- 按钮组 -->
			<ElFormItem class="mb-0">
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<ElButton class="w-full sm:w-[120px]" type="primary" @click="submitForm(ruleFormRef)">登录</ElButton>
					<ElButton class="w-full sm:w-[120px]" @click="resetForm(ruleFormRef)">重置</ElButton>
				</div>
			</ElFormItem>
		</ElForm>
	</div>
</template>
