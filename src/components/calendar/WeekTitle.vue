<script setup lang="ts">
const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
</script>
<template>
  <!-- 周标题 -->
  <div class="grid grid-cols-7 gap-2 xl:gap-4 mb-2 xl:mb-4">
    <div v-for="item in week" :key="item" class="text-sm xl:text-base text-center p-1 xl:p-2">
      {{ item }}
    </div>
  </div>
</template>