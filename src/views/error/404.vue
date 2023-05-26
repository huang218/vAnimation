<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  router.replace('/')
}
</script>
<template>
  <div class="error">
    <h1>404</h1>
    <el-link class="btn" type="success" @click="goBack">Go Back</el-link>
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