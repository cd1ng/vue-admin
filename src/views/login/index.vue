<script setup lang="ts">
import { ElMessage, ElLoading } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { authApi } from '@/http/auth/api'
import { useUserInfoStore } from '@/store/userInfo'

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

defineOptions({
	name: 'LoginPage'
})

// 定义表单数据的类型接口
type RuleForm = {
	name: string
	password: string
}

// 登录接口返回的数据类型
type LoginDataType = {
	username: string
	token: string
	role: string
	image: string
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
		{ min: 3, max: 7, message: '长度限制从3位到7位', trigger: 'blur' }
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
			const { username, token, role, image } = res.data as LoginDataType

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
	<!-- 带渐变背景的容器 -->
	<div class="min-h-screen relative bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
		<!-- 背景装饰 -->
		<!-- inset-0 覆盖全屏幕 -->
		<div class="absolute inset-0 overflow-hidden">
			<!-- 气泡动画移动可超出屏幕 -->
			<div class="absolute -inset-[10px] opacity-50">
				<!-- filter blur-xl设置气泡磨砂效果 -->
				<div
					class="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"
				></div>
				<div
					class="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
				></div>
				<div
					class="absolute bottom-1/3 left-1/3 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
				></div>
			</div>
		</div>

		<!-- 登录表单组件 -->
		<ElForm
			ref="ruleFormRef"
			label-width="auto"
			:size="formSize"
			:model="userInfo"
			:rules="rules"
			class="relative w-[90%] min-w-[300px] max-w-[500px] p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl"
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

<style scoped>
@keyframes blob {
	0% {
		transform: translate(0px, 0px) scale(1);
	}
	33% {
		transform: translate(30px, -50px) scale(1.1);
	}
	66% {
		transform: translate(-20px, 20px) scale(0.9);
	}
	100% {
		transform: translate(0px, 0px) scale(1);
	}
}

.animate-blob {
	animation: blob 7s infinite;
}

.animation-delay-2000 {
	animation-delay: 2s;
}

.animation-delay-4000 {
	animation-delay: 4s;
}
</style>
