<script setup lang="ts">
import { useRouterJump } from '@/hooks/useRouterJump'

const { replaceRouter } = useRouterJump()
const goBack = () => {
  replaceRouter('/')
}
</script>
<template>
  <div class="error">
    <h1>404</h1>
    <ElLink class="btn" type="success" @click="goBack">Go Back</ElLink>
  </div>
</template>
<style lang="less" scoped>
.error {
  text-align: center;
  h1 {
    font-size: 100px;
  }
  .btn {
    font-size: 30px;
  }
}
</style>
