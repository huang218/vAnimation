<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const query = computed(() => route.query)
onMounted(() => {
  console.log(route?.query, 'route')
})
</script>
<template>
  <MainPage :name="query.name" :alias="'table详情'">
    <el-descriptions :column="3" :size="'large'">
      <el-descriptions-item label="date">{{ query.date }}</el-descriptions-item>
      <el-descriptions-item label="state">{{ query.state }}</el-descriptions-item>
      <el-descriptions-item label="city">{{ query.city }}</el-descriptions-item>
      <el-descriptions-item label="address">{{ query.address }}</el-descriptions-item>
      <el-descriptions-item label="zip">{{ query.zip }}</el-descriptions-item>
    </el-descriptions>
  </MainPage>
</template>
<style lang="less" scoped></style>
