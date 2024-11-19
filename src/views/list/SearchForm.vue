<script setup lang="ts">
interface SearchFormState {
  name: string
  status: string
  date: string
}

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  search: []
  reset: []
}>()

const searchForm = reactive<SearchFormState>({
  name: '',
  status: '',
  date: ''
})

const handleSearch = () => {
  emit('search')
}

const resetSearch = () => {
  Object.assign(searchForm, {
    name: '',
    status: '',
    date: ''
  })
  emit('reset')
}
</script>

<template>
  <ElCard class="mb-4">
    <ElForm :model="searchForm" label-width="80px" inline>
      <ElFormItem label="名称">
        <ElInput v-model="searchForm.name" placeholder="请输入名称" clearable />
      </ElFormItem>
      <ElFormItem label="状态">
        <ElSelect v-model="searchForm.status" placeholder="请选择状态" clearable>
          <ElOption label="已完成" value="completed" />
          <ElOption label="进行中" value="processing" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="日期">
        <ElDatePicker v-model="searchForm.date" type="date" placeholder="选择日期" clearable />
      </ElFormItem>
      <ElFormItem>
        <ElButton :loading="loading" type="primary" @click="handleSearch">搜索</ElButton>
        <ElButton @click="resetSearch">重置</ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template> 