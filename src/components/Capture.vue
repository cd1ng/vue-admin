<template>
  <ElIcon :size="20" class="main-bg cursor-pointer" @click="handleCapture">
    <Camera />
  </ElIcon>
</template>

<script lang="ts" setup>
import { outputPDF } from '@/utils/pdfPrint';
import { Camera } from '@element-plus/icons-vue';

const handleCapture = async () => {
  // 获取需要截图的容器元素
  const element = document.querySelector('.dashboard-container')
  if (!element) {
    console.error('Element not found')
    return
  }
  try {
    await outputPDF(element as HTMLElement, 'test.pdf')
  } catch (error) {
    console.error('Failed to capture and generate PDF:', error)
    ElMessage.error('Failed to generate PDF')
  }
}
</script>
