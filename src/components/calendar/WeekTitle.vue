<script setup lang="ts">
const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
</script>

<template>
  <!-- 周标题 -->
  <div class="grid grid-cols-7 gap-1">
    <div v-for="item in week" 
         :key="item" 
         class="text-center py-2 text-sm text-gray-500 font-medium">
      {{ item }}
    </div>
  </div>
</template>