<template>
	<!-- 顶层容器，使用 Element Plus 的 v-loading 指令展示加载状态 -->
	<div v-loading="showLoading" element-loading-text="数据加载中...">
		<!-- 表格信息展示和控制区 -->
		<p>
			当前显示：{{ `${rowCount}行${customColCount + 2}列` }}， 显示/隐藏 table：
			<ElSwitch :model-value="showTable" @click="switchTableShow"></ElSwitch>
		</p>

		<!-- 大数据量表格 -->
		<ElTable v-if="showTable" :data="tableData" class="w-full h-[800px] overflow-scroll" layout="fixed">
			<!-- 固定列：信息列 -->
			<ElTableColumn prop="info" label="信息" width="80" fixed />

			<!-- 固定列：状态切换列 -->
			<ElTableColumn prop="status" label="状态" :width="80" fixed>
				<template #default="scope">
					<ElSwitch v-model="scope.row.status" @change="statusChange" />
				</template>
			</ElTableColumn>

			<!-- 动态生成的大量数据列 -->
			<ElTableColumn v-for="item in customColumns" :key="item.prop" :prop="item.prop" :label="item.label" :width="100">
				<template #default="scope">
					<!-- 带有条件性tooltip的单元格内容 -->
					<span v-if="!(item.prop.includes('column1') || item.prop.includes('column2'))">
						{{ scope.row[item.prop] }}
					</span>
					<ElTooltip v-else placement="top-start">
						<template #content>
							<span>{{ "tooltip显示" + scope.row[item.prop] }}</span>
						</template>
						<div>
							<ElTag type="success">测试</ElTag>
							<span>{{ scope.row[item.prop] }}</span>
							<ElTag type="success" @click="copyText(scope.row[item.prop])">复制</ElTag>
						</div>
					</ElTooltip>
				</template>
			</ElTableColumn>
		</ElTable>
	</div>
</template>

<script lang="ts" setup>
import { useCopy } from "@/hooks";
import { ElMessage } from "element-plus";
// 状态控制
const showLoading = ref(false);
const showTable = ref(true);
const tableData: any = shallowRef([]); // 表格数据
const customColumns: any = shallowRef([]); // 自定义列配置

// 文本复制
const { copyText } = useCopy()
// 性能测试配置
const customColCount = 90; // 自定义列数量（大量列以测试性能）
const rowCount = 20; // 行数量

// 组件挂载前初始化数据
onBeforeMount(() => {
	// 初始化列配置
	let temp = [];
	for (let i = 0; i < customColCount; i++) {
		temp.push({ prop: `column${i + 1}`, label: `第${i + 1}列` });
	}
	customColumns.value = temp;

	// 初始化表格数据（生成大量模拟数据）
	let dataTemp = [];
	for (let i = 0; i < rowCount; i++) {
		let row: any = { info: `第${i + 1}行`, status: true };
		i === 0 && (row.status = false); // 第一行状态设为 false
		// 为每一行生成所有列的数据
		for (let j = 0; j < customColCount + 2; j++) {
			const randomNum = Math.random()
			row[`column${j + 1}`] = `第${i + 1}行${j + 1}列\n产量：${randomNum}`;
		}
		dataTemp.push(row);
	}
	tableData.value = dataTemp;
});

/**
 * 切换表格显示/隐藏
 * 使用 loading 和 setTimeout 模拟真实场景下的性能表现
 */
const switchTableShow = () => {
	// 显示 loading 状态
	showLoading.value = true;

	// 延迟执行以确保 loading 状态能被渲染
	setTimeout(() => {
		let startTime = +new Date();
		showTable.value = !showTable.value; // 切换表格显示状态（会触发大量 DOM 操作）
		showLoading.value = false; // 关闭 loading

		// 使用宏任务测量渲染耗时
		setTimeout(() => {
			let endTime = +new Date();
			ElMessage.success(`渲染耗时：${(endTime - startTime) / 1000}s`);
		}, 0);
	}, 200);
};

/**
 * 状态切换处理
 * 模拟真实场景中的接口调用和数据刷新
 */
const statusChange = () => {
	let startTime = +new Date();
	// 模拟接口延迟
	setTimeout(() => {
		// 通过深拷贝模拟数据更新
		tableData.value = JSON.parse(JSON.stringify(tableData.value));
		// 计算并显示渲染耗时
		setTimeout(() => {
			let endTime = +new Date();
			ElMessage.success(`渲染耗时：${(endTime - startTime) / 1000}s`);
		}, 0);
	}, 300);
};
</script>
