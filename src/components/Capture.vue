<template>
  <ElIcon :size="20" class="main-bg cursor-pointer" @click="handleCapture">
    <Camera />
  </ElIcon>
</template>

<script lang="ts" setup>
import { Camera } from '@element-plus/icons-vue';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const handleCapture = async () => {
  // 获取需要截图的容器元素
  const element = document.querySelector('.dashboard-container')
  if (!element) {
    console.error('Element not found')
    return
  }

  try {
    // 使用 html2canvas 将 DOM 元素转换为 canvas
    const canvas = await html2canvas(element as HTMLElement, {
      scrollY: window.scrollY, // 考虑页面的垂直滚动位置
      windowHeight: document.documentElement.scrollHeight, // 设置完整的文档高度
      height: element.scrollHeight, // 使用元素的实际滚动高度
      width: element.scrollWidth, // 使用元素的实际滚动宽度
      useCORS: true, // 允许加载跨域图片
      allowTaint: true, // 允许跨域图片影响画布
      scale: 1.5, // 设置渲染的缩放比例，权衡清晰度和文件大小
      logging: false, // 关闭日志输出
      // 处理克隆的 DOM 元素
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('.dashboard-container')
        if (clonedElement) {
          // 确保克隆元素可以完整显示
          (clonedElement as HTMLElement).style.height = 'auto'
          ;(clonedElement as HTMLElement).style.overflow = 'visible'
        }
      }
    })

    // 将 canvas 转换为图片数据，使用 PNG 格式并设置质量
    const imgData = canvas.toDataURL('image/png', 0.7)

    // 创建 PDF 文档
    const pdf = new jsPDF({
      orientation: 'p', // 纵向
      unit: 'mm', // 单位为毫米
      format: 'a4', // A4 纸张大小
      compress: true // 启用 PDF 压缩
    })

    // 计算图片在 PDF 中的尺寸
    const imgWidth = 210 // A4 纸的宽度（毫米）
    const pageHeight = 297 // A4 纸的高度（毫米）
    const imgHeight = (canvas.height * imgWidth) / canvas.width // 保持图片宽高比
    let heightLeft = imgHeight // 剩余要绘制的高度
    let position = 0 // 当前绘制位置

    // 添加第一页图片
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST', 0)
    heightLeft -= pageHeight

    // 如果内容超过一页，添加新页面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight // 计算新页面的绘制位置
      pdf.addPage() // 添加新页面
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST', 0)
      heightLeft -= pageHeight
    }

    // 保存 PDF 文件
    pdf.save('dashboard-report.pdf')
  } catch (error) {
    console.error('Failed to capture and generate PDF:', error)
    ElMessage.error('Failed to generate PDF')
  }
}
</script>
