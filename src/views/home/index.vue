<script setup lang="ts">
import Test from './Test.vue'
// import InfoCard from './InfoCard.vue'
// import UserDistribution from './UserDistribution.vue'
// import ProductSale from './ProductSale.vue'
// import VisitTrend from './VisitTrend.vue'
// import { dataApis } from '@/api/data'
// import { emptySaleData, emptyUserDistributionData, emptyVisitData } from '@/constant/home'

// import type { SaleDataType, UserDistributionData, VisitData } from '@/api/data/type'
// import type { InfoData } from './types'

// defineOptions({
// 	name: 'HomePage'
// })

// const infoCard = ref<InfoData[]>()
// // 访问数据
// const visitData = ref<VisitData>(emptyVisitData)
// // 销售数据
// const saleData = ref<SaleDataType[]>(emptySaleData)
// // 用户分布数据
// const userDistributionData = ref<UserDistributionData>(emptyUserDistributionData)

// const loading = ref(true)

// onMounted(async () => {
// 	const { getVisits, getUserDistribution, getSaleCount, getWorkInfo } = dataApis
// 	try {
// 		const [visitRes, userDistributionRes, saleRes, workInfoRes] = await Promise.all([
// 			getVisits(),
// 			getUserDistribution(),
// 			getSaleCount(),
// 			getWorkInfo()
// 		])
// 		visitData.value = visitRes.data
// 		userDistributionData.value = userDistributionRes.data
// 		saleData.value = saleRes.data
// 		infoCard.value = workInfoRes.data
// 	} catch (error) {
// 		console.error('Failed to fetch dashboard data:', error)
// 		ElMessage.error('Failed to load dashboard data')
// 	} finally {
// 		loading.value = false
// 	}
// })
</script>

<template>
	<Test />
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
