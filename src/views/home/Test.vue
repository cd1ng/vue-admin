<template>
	<div class="w-full p-3 sm:p-4 md:p-5 2xl:p-6">
		<el-card class="h-full w-full 2xl:shadow-2xl">
			<template #header>
				<div class="-m-5 flex flex-col items-center justify-between bg-blue-500 p-3 text-white sm:flex-row sm:p-4 md:p-5 2xl:p-6">
					<div class="mb-2 sm:mb-0">
						<span class="text-2xl font-bold sm:text-2xl 2xl:text-3xl">Git代码分析工具</span>
					</div>
					<div class="text-2xl text-white sm:text-2xl 2xl:text-3xl">
						<el-icon class="text-2xl text-white sm:text-2xl 2xl:text-3xl"><StarFilled /></el-icon>
					</div>
				</div>
			</template>

			<div class="flex h-full flex-col py-3 sm:py-4 md:py-5 2xl:py-6">
				<div class="mb-4 sm:mb-5 2xl:mb-6">
					<h2 class="mb-3 text-base font-normal sm:mb-4 sm:text-lg 2xl:text-2xl">项目选择</h2>

					<div class="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-0 2xl:mb-5">
						<el-input
							v-model="searchQuery"
							placeholder="输入项目名称或项目描述..."
							class="w-full sm:mr-2 sm:flex-1 2xl:text-base"
						>
						</el-input>
						<el-button type="primary" class="w-full sm:w-auto 2xl:h-10 2xl:text-base" @click="searchProjects">搜索</el-button>
					</div>

					<div class="mb-2 flex justify-between font-bold 2xl:mb-3">
						<span class="2xl:text-base">可用项目</span>
						<el-button type="danger" class="2xl:h-10 2xl:text-base" @click="confirmSelection">确定</el-button>
					</div>

					<div
						class="mb-4 max-h-[200px] overflow-y-auto rounded-md border border-gray-200 sm:mb-5 sm:max-h-[250px] md:max-h-[300px] 2xl:max-h-[350px]"
					>
						<div
							v-for="(project, index) in projects"
							:key="index"
							class="flex items-start border-b border-gray-100 p-2 last:border-b-0 sm:p-3 2xl:p-4"
						>
							<el-checkbox
								v-model="project.selected"
								:disabled="isProjectSelectionConfirmed"
								class="2xl:scale-125"
							></el-checkbox>
							<div class="ml-2 flex flex-1 flex-col gap-1 2xl:ml-3 2xl:gap-2">
								<span class="text-xs font-bold sm:text-sm 2xl:text-base">{{ project.name }}</span>
								<span class="text-xs text-gray-500 sm:text-sm 2xl:text-base"
									>项目描述: {{ project.description || '无' }}</span
								>
								<span class="text-xs text-gray-500 sm:text-sm 2xl:text-base">最后更新: {{ project.last_activity }}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mb-4 sm:mb-5 2xl:mb-6">
					<h2 class="mb-3 text-base font-normal sm:mb-4 sm:text-lg 2xl:text-2xl">操作</h2>
					<!-- 添加工作流进度指示器 -->
					<div
						class="mb-3 flex flex-wrap items-center overflow-x-auto whitespace-nowrap rounded-md bg-gray-50 p-2 sm:mb-4 sm:p-3 md:flex-nowrap 2xl:mb-4 2xl:p-4"
					>
						<div
							class="progress-button"
							:class="{
								'bg-gray-200 text-gray-500': workflowStep < 1,
								'bg-blue-500 text-white': workflowStep === 1,
								'bg-green-500 text-white': workflowStep > 1
							}"
						>
							确定
						</div>
						<div class="mx-1 text-gray-500 sm:mx-2 2xl:mx-3 2xl:text-lg">→</div>
						<div
							class="progress-button"
							:class="{
								'bg-gray-200 text-gray-500': workflowStep < 2,
								'bg-blue-500 text-white': workflowStep === 2,
								'bg-green-500 text-white': workflowStep > 2
							}"
						>
							克隆
						</div>
						<div class="mx-1 text-gray-500 sm:mx-2 2xl:mx-3 2xl:text-lg">→</div>
						<div
							class="progress-button"
							:class="{
								'bg-gray-200 text-gray-500': workflowStep < 3,
								'bg-blue-500 text-white': workflowStep === 3,
								'bg-green-500 text-white': workflowStep > 3
							}"
						>
							扫描
						</div>
						<div class="mx-1 text-gray-500 sm:mx-2 2xl:mx-3 2xl:text-lg">→</div>
						<div
							class="progress-button"
							:class="{
								'bg-gray-200 text-gray-500': workflowStep < 4,
								'bg-blue-500 text-white': workflowStep === 4,
								'bg-green-500 text-white': workflowStep > 4
							}"
						>
							分析
						</div>
						<div class="mx-1 text-gray-500 sm:mx-2 2xl:mx-3 2xl:text-lg">→</div>
						<div
							class="progress-button"
							:class="{
								'bg-gray-200 text-gray-500': workflowStep < 5,
								'bg-blue-500 text-white': workflowStep === 5,
								'bg-green-500 text-white': workflowStep > 5
							}"
						>
							<span class="hidden md:inline">推送至产品开发平台</span>
							<span class="inline md:hidden">推送至平台</span>
						</div>
					</div>
					<div class="mb-3 flex flex-wrap gap-2 sm:mb-4 sm:flex-nowrap 2xl:gap-3">
						<el-button
							type="primary"
							:loading="isCloning"
							:disabled="!isProjectSelectionConfirmed || workflowStep > 2 || isCloning"
							class="min-w-[90px] 2xl:h-12 2xl:text-base"
							:class="{ 'animate-pulse shadow-lg shadow-blue-300/50': isProjectSelectionConfirmed && workflowStep === 1 }"
							@click="completeAction"
						>
							{{ isCloning ? '克隆中...' : '克隆' }}
						</el-button>
						<el-button
							:loading="isScanning"
							:disabled="workflowStep !== 2 || isScanning"
							class="min-w-[90px] 2xl:h-12 2xl:text-base"
							:class="{ 'animate-pulse shadow-lg shadow-blue-300/50': workflowStep === 2 }"
							@click="scanAction"
						>
							{{ isScanning ? '扫描中...' : '扫描' }}
						</el-button>
						<el-button
							:loading="isAnalyzing"
							:disabled="workflowStep !== 3 || isAnalyzing"
							class="min-w-[90px] 2xl:h-12 2xl:text-base"
							:class="{ 'animate-pulse shadow-lg shadow-blue-300/50': workflowStep === 3 }"
							@click="analyzeAction"
						>
							{{ isAnalyzing ? '分析中...' : '分析' }}
						</el-button>
						<el-button
							:loading="isPushing"
							:disabled="workflowStep !== 4 || isPushing"
							class="min-w-[90px] text-xs sm:text-sm 2xl:text-base"
							:class="{ 'animate-pulse shadow-lg shadow-blue-300/50': workflowStep === 4 }"
							@click="exportAction"
						>
							<span class="hidden md:inline">{{ isPushing ? '推送中...' : '推送至产品开发平台' }}</span>
							<span class="inline md:hidden">{{ isPushing ? '推送中...' : '推送至平台' }}</span>
						</el-button>
					</div>
				</div>

				<div class="mb-4 sm:mb-5 2xl:mb-6">
					<h2 class="mb-3 text-base font-normal sm:mb-4 sm:text-lg 2xl:text-2xl">进度</h2>
					<el-progress
						:percentage="progressPercentage"
						:format="format"
						:stroke-width="12"
						class="2xl:scale-y-110 2xl:transform"
					/>
				</div>

				<div class="flex-grow overflow-hidden">
					<h2 class="mb-3 text-base font-normal sm:mb-4 sm:text-lg 2xl:text-2xl">操作日志</h2>
					<div
						class="h-[100px] overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-2 sm:h-[120px] md:h-[150px] lg:h-[200px] 2xl:h-[300px] 2xl:p-3"
					>
						<div v-for="(log, index) in operationLogs" :key="index" class="py-1 font-mono text-xs sm:text-sm 2xl:text-base">
							{{ log }}
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus' // 引入 ElMessage 和 ElMessageBox 组件
// import http from '@/utils/http/http'

// 搜索
const searchQuery = ref('')
const searchProjects = () => {
	// 实现搜索功能
	console.log('搜索:', searchQuery.value)
}
const allProjects = ref([])

const workflowStep = ref(0) // 工作流步骤：0=初始状态, 1=已确认选择, 2=已克隆, 3=已扫描, 4=已分析, 5=已导出
const isProjectSelectionConfirmed = ref(false)

const isCloning = ref(false) //克隆
const isScanning = ref(false) //扫描
const isAnalyzing = ref(false) //分析
const isPushing = ref(false) //推送

// 项目列表
const projects = computed(() => {
	if (!searchQuery.value.trim()) {
		return allProjects.value
	}

	const keyword = searchQuery.value.toLowerCase()
	return allProjects.value.filter(
		(project) =>
			project.name.toLowerCase().includes(keyword) || (project.description && project.description.toLowerCase().includes(keyword))
	)
})

// 确认选择项目
const confirmSelection = () => {
	let total = 0
	projects.value.forEach((project) => {
		if (project.selected) {
			total++
		}
	})

	if (total === 0) {
		ElMessage({
			message: '请至少选择一个项目',
			type: 'info',
			duration: 2000
		})
		return
	} else if (total > 1) {
		ElMessage({
			message: '此版本只能选择一个项目',
			type: 'warning',
			duration: 3000
		})

		for (let i = 0; i < projects.value.length; i++) {
			projects.value[i].selected = false
		}
		return
	}

	// 确认对话框
	ElMessageBox.confirm('确定选择该项目进行操作吗？', '确认选择', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			// 用户点击确定
			const selectedProject = projects.value.find((project) => project.selected)
			isProjectSelectionConfirmed.value = true
			workflowStep.value = 1 // 更新工作流状态

			ElMessage({
				message: `已确认选择项目: ${selectedProject.name}`,
				type: 'success',
				duration: 2000
			})

			addLog(`已确认选择项目: ${selectedProject.name}`)
			addLog('请点击"克隆"按钮开始操作')

			// 高亮克隆按钮
			highlightNextButton()
		})
		.catch(() => {
			// 用户点击取消
			ElMessage({
				type: 'info',
				message: '已取消选择'
			})
		})
}

// const selectedProjects = computed(() => {
// 	return projects.value.filter((project) => project.selected)
// })

const highlightNextButton = () => {
	console.log('高亮下一个按钮')
}

const progressPercentage = ref(50)
const format = (percentage) => `${percentage}%`

const updateProgress = (step) => {
	const progressMap = {
		0: 0,
		1: 20,
		2: 40,
		3: 60,
		4: 80,
		5: 100
	}
	progressPercentage.value = progressMap[step]
}

const completeAction = async () => {
	if (!isProjectSelectionConfirmed.value) {
		ElMessage({
			message: '请先确认选择项目',
			type: 'warning',
			duration: 2000
		})
		return
	}

	const selectedProject = projects.value.find((project) => project.selected)
	addLog(`开始克隆项目: ${selectedProject.name}...`)

	const status = await cloneProject()
	console.log(status)
	if (status) {
		workflowStep.value = 2 // 更新状态为已克隆
		updateProgress(workflowStep.value)
		addLog(`成功克隆项目: ${selectedProject.name}`)
		addLog('请点击"扫描"按钮继续')

		// 高亮下一个按钮
		highlightNextButton()

		ElMessage({
			message: '克隆完成，可以进行扫描了',
			type: 'success',
			duration: 2000
		})
	} else {
		ElMessage({
			message: '克隆失败，请检查网络连接',
			type: 'error',
			duration: 2000
		})
	}
}

const cloneProject = async () => {
	// const project = projects.value.find((project) => project.selected)
	try {
		isCloning.value = true // 开始克隆，设置加载状态
		return true
	} catch (error) {
		console.error('克隆项目失败:', error)
		addLog('克隆项目失败，请检查网络连接')
		return false
	} finally {
		isCloning.value = false // 无论成功失败，都要关闭加载状态
	}
}

const scanProject = async () => {
	// const project = projects.value.find((project) => project.selected)
	try {
		isScanning.value = true
		return true
	} catch (error) {
		console.error('扫描项目失败:', error)
		addLog('扫描项目失败，请检查网络连接')
		return false
	} finally {
		isScanning.value = false // 无论成功失败，都要关闭加载状态
	}
}

const scanAction = async () => {
	const selectedProject = projects.value.find((project) => project.selected)
	addLog(`开始扫描项目: ${selectedProject.name}...`)
	const result = await scanProject()
	if (result === 1004) {
		workflowStep.value = 3 // 更新状态为已扫描
		updateProgress(workflowStep.value)
		// 高亮下一个按钮
		highlightNextButton()

		ElMessage({
			message: '扫描完成，可以进行分析了',
			type: 'success',
			duration: 2000
		})
	} else if (result === 1002) {
		ElMessage({
			message: '项目未克隆',
			type: 'error',
			duration: 2000
		})
	} else if (result === 1003) {
		ElMessage({
			message: '项目中没有.c文件 ，无法进行分析',
			type: 'error',
			duration: 2000
		})
	} else {
		ElMessage({
			message: '扫描失败，请检查网络连接',
			type: 'error',
			duration: 2000
		})
	}
}

const analyzeProject = async () => {
	// const project = projects.value.find((project) => project.selected)
	try {
		isAnalyzing.value = true
		return true
	} catch (error) {
		console.error('分析项目失败:', error)
		addLog('分析项目失败，请检查网络连接')
		return false
	} finally {
		isAnalyzing.value = false // 无论成功失败，都要关闭加载状态
	}
}

const pushProject = async () => {
	// const project = projects.value.find((project) => project.selected)
	try {
		isPushing.value = true
		return true
	} catch (error) {
		console.error('推送项目失败:', error)
		addLog('推送项目失败，请检查网络连接')
		return false
	} finally {
		isPushing.value = false // 无论成功失败，都要关闭加载状态
	}
}

const analyzeAction = async () => {
	const selectedProject = projects.value.find((project) => project.selected)
	addLog(`开始分析项目代码: ${selectedProject.name}...`)

	const [result, analysis_result] = await analyzeProject()
	if (result === true) {
		workflowStep.value = 4 // 更新状态为已分析
		updateProgress(workflowStep.value)
		addLog(`代码分析完成`)
		addLog(analysis_result)
		addLog('请点击"推送至产品开发平台"按钮继续')

		// 高亮下一个按钮
		highlightNextButton()

		ElMessage({
			message: '分析完成，可以推送到产品开发平台了',
			type: 'success',
			duration: 2000
		})
	} else {
		ElMessage({
			message: '分析失败，请检查网络连接',
			type: 'error',
			duration: 2000
		})
	}
}

const exportAction = async () => {
	const selectedProject = projects.value.find((project) => project.selected)
	addLog(`开始推送至产品开发平台: ${selectedProject.name}...`)

	const result = await pushProject()
	if (result === 1004 || result === true) {
		workflowStep.value = 5 // 更新状态为已导出
		updateProgress(workflowStep.value)
		addLog(`推送至产品开发平台完成`)
		addLog('全部操作已完成')

		ElMessage({
			message: '推送完成，工作流程已结束',
			type: 'success',
			duration: 2000
		})
	} else {
		ElMessage({
			message: '推送失败，请检查网络连接',
			type: 'error',
			duration: 2000
		})
	}
}

// 操作日志
const operationLogs = ref([])

const addLog = (log) => {
	const now = new Date()
	const hours = now.getHours().toString().padStart(2, '0')
	const minutes = now.getMinutes().toString().padStart(2, '0')
	const seconds = now.getSeconds().toString().padStart(2, '0')
	const timeString = `${hours}:${minutes}:${seconds}`
	operationLogs.value.unshift(`${timeString} - ${log}`)
}

const fetchProjects = () => {
	// http.get('/testqueueall_project', {
	// 	timeout: 10000
	// })
	// 	.then((response) => {
	// 		// 更新原始数据
	// 		allProjects.value = response.data.data.map((project) => ({
	// 			...project,
	// 			selected: false // 确保每个项目都有 selected 属性
	// 		}))
	// 	})
	// 	.catch((error) => {
	// 		console.error('获取项目列表失败:', error)
	// 		addLog('获取项目列表失败，请检查网络连接')
	// 	})
}

// 生命周期钩子 - 在组件挂载后自动获取项目列表
onMounted(() => {
	console.log('组件已挂载，开始获取项目列表')
	fetchProjects()
	addLog('欢迎使用Git代码分析工具')
	addLog('请选择一个项目并点击"确定"按钮开始')
	updateProgress(workflowStep.value) // 初始化进度条
})
</script>
