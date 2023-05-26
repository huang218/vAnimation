<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
async function submit() {
  localStorage.setItem('token', '123455');
  router.replace({ path: "/" });
}
</script>
<template>
  <div>
    <el-Button @click="submit">登录</el-Button>
  </div>
</template>

<style lang="less" scoped>

</style>