<script setup lang="ts">
import InfoCard from './InfoCard.vue'
import UserDistribution from './UserDistribution.vue'
import ProductSale from './ProductSale.vue'
import VisitTrend from './VisitTrend.vue'
import { dataApis } from '@/api/data'
import { emptySaleData, emptyUserDistributionData, emptyVisitData } from '@/constant/home'

import type { SaleDataType, UserDistributionData, VisitData } from '@/api/data/type'
import type { InfoData } from './types'

defineOptions({
	name: 'HomePage'
})

const infoCard = ref<InfoData[]>()
// 访问数据
const visitData = ref<VisitData>(emptyVisitData)
// 销售数据
const saleData = ref<SaleDataType[]>(emptySaleData)
// 用户分布数据
const userDistributionData = ref<UserDistributionData>(emptyUserDistributionData)

const loading = ref(true)

onMounted(async () => {
	const { getVisits, getUserDistribution, getSaleCount, getWorkInfo } = dataApis
	try {
		const [visitRes, userDistributionRes, saleRes, workInfoRes] = await Promise.all([
			getVisits(),
			getUserDistribution(),
			getSaleCount(),
			getWorkInfo()
		])
		visitData.value = visitRes.data
		userDistributionData.value = userDistributionRes.data
		saleData.value = saleRes.data
		infoCard.value = workInfoRes.data
	} catch (error) {
		console.error('Failed to fetch dashboard data:', error)
		ElMessage.error('Failed to load dashboard data')
	} finally {
		loading.value = false
	}
})
</script>

<template>
	<ElSkeleton :loading="loading" animated>
		<template #template>
			<div class="w-full">
				<!-- InfoCard 骨架屏 -->
				<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
					<div v-for="i in 4" :key="i" class="skeleton-wrapper h-[120px] rounded-lg p-4 shadow-sm">
						<ElSkeletonItem variant="text" class="h-full w-full" />
					</div>
				</div>
				<!-- 图表骨架屏 -->
				<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div v-for="i in 3" :key="i" class="skeleton-wrapper card-bg h-[400px] rounded-lg p-4 shadow-sm">
						<ElSkeletonItem variant="text" class="h-full w-full" />
					</div>
				</div>
			</div>
		</template>

		<template #default>
			<div class="dashboard-container">
				<InfoCard :info-data="infoCard" />
				<!-- 图表区域 -->
				<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<Calendar class="pdf-element card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
					<UserDistribution :user-distribution-data="userDistributionData"
						class="pdf-element card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
					<VisitTrend :visit-data="visitData" class="pdf-element card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
					<ProductSale :sale-data="saleData" class="pdf-element card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
					<div class="pdf-element bg-blue-100 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-200 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-300 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-400 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-500 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-600 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-700 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-800 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-blue-900 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-100 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-200 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-300 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-400 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-500 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-600 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-700 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-800 text h-[400px] rounded-lg p-4 shadow-sm"></div>
					<div class="pdf-element bg-red-900 text h-[400px] rounded-lg p-4 shadow-sm"></div>
				</div>
			</div>
		</template>
	</ElSkeleton>
</template>

<style scoped>
.dashboard-container {
	min-height: 100%;
	width: 100%;
	overflow: visible;
	padding-bottom: 20px;
	/* 确保内容不会被裁剪 */
	position: relative;
	z-index: 1;
}

/* 骨架屏高度100% */
.skeleton-wrapper :deep(.el-skeleton__item) {
	height: 100%;
}
</style>
