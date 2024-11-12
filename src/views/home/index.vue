<script setup lang="ts">
import { useCounterStore } from '@/store/counter'
// 不能对它进行解构，否则会报错
const counter = useCounterStore()
</script>

<template>
  Home
  <button @click="counter.increment">+</button>
  <p>{{ counter.count }}</p>
  <p>doubleCount:{{ counter.doubleCount }}</p>
</template>
