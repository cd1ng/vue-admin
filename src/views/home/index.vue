<script setup lang="ts">
import InfoCard from './InfoCard.vue'
import UserDistribution from './UserDistribution.vue'
import ProductSale from './ProductSale.vue'
import VisitTrend from './VisitTrend.vue'
import { dataApi } from '@/http/data/api'
import { emptySaleData, emptyUserDistributionData, emptyVisitData } from '@/constant/home'

import type { SaleDataType, UserDistributionData, VisitData } from '@/types/api'
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

onMounted(async () => {
	try {
		const [visitRes, userDistributionRes, saleRes, workInfoRes] = await Promise.all([
			dataApi.getVisits(),
			dataApi.getUserDistribution(),
			dataApi.getSaleCount(),
			dataApi.getWorkInfo()
		])

		visitData.value = visitRes.data
		userDistributionData.value = userDistributionRes.data
		saleData.value = saleRes.data
		infoCard.value = workInfoRes.data
	} catch (error) {
		console.error('Failed to fetch dashboard data:', error)
		ElMessage.error('Failed to load dashboard data')
	}
})
</script>

<template>
	<InfoCard :info-data="infoCard" />
	<!-- 图表区域 -->
	<div class="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
		<UserDistribution :user-distribution-data="userDistributionData" class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
		<VisitTrend :visit-data="visitData" class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
		<ProductSale :sale-data="saleData" class="card-bg text p-4 rounded-lg shadow-sm h-[400px]" />
	</div>
</template>
