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
			<InfoCard :info-data="infoCard" />
			<!-- 图表区域 -->
			<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<UserDistribution :user-distribution-data="userDistributionData" class="card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
				<VisitTrend :visit-data="visitData" class="card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
				<ProductSale :sale-data="saleData" class="card-bg text h-[400px] rounded-lg p-4 shadow-sm" />
			</div>
		</template>
	</ElSkeleton>
</template>

<style scoped>
/* 骨架屏高度100% */
.skeleton-wrapper :deep(.el-skeleton__item) {
	height: 100%;
}
</style>
