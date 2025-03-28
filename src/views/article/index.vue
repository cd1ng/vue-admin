<script setup lang="ts">
import { createArticle } from '@/api/data/server'

const dialogVisible = ref(false)
// do not use same name with ref
const form = reactive({
	name: '',
	desc: ''
})

const onSubmit = () => {
	console.log('submit!')
	createArticle(form.name, '', form.desc)
}
</script>

<template>
	<div>
		<h1>文章列表</h1>
		<ElButton plain @click="dialogVisible = true">新增文章</ElButton>
	</div>

	<ElDialog v-model="dialogVisible" title="新建文章" width="500">
		<template #footer>
			<ElForm :model="form" label-width="auto" style="max-width: 600px">
				<ElFormItem label="文章标题">
					<ElInput v-model="form.name" />
				</ElFormItem>
				<ElFormItem label="文章内容">
					<ElInput v-model="form.desc" type="textarea" :rows="10" />
				</ElFormItem>
				<ElFormItem>
					<ElButton type="primary" @click="onSubmit">创建</ElButton>
					<ElButton @click="dialogVisible = false">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</template>
	</ElDialog>
</template>
