<script setup lang="ts">
import { useRouterJump } from '@/hooks/useRouterJump';
const { replaceRouter } = useRouterJump();

async function submit() {
  localStorage.setItem('token', '123455');
  replaceRouter("/");
}
</script>
<template>
  <div>
    <el-Button @click="submit">登录</el-Button>
  </div>
</template>

<style lang="less" scoped>

</style>