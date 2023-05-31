<script setup lang="ts">
import { userStore } from '@/stores';
import { useRouterJump } from '@/hooks/useRouterJump';

const { replaceRouter } = useRouterJump();
const { getUserInfo } = userStore();

async function submit() {
  const datas = await getUserInfo();
  if(datas) replaceRouter('/')
}
</script>
<template>
  <div>
    <el-Button @click="submit">登录</el-Button>
  </div>
</template>

<style lang="less" scoped>

</style>