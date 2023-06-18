<script setup lang="ts">
import { useLoading } from '@/hooks/useLoading'
const { setLoading } = useLoading()

const mockRquest = () => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 2000)
}
</script>
<template>
  <div>
    <el-button plain @click="mockRquest">加载loading</el-button>
  </div>
</template>
<style lang="less" scoped></style>
