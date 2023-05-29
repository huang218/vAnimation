<script setup lang="ts">
import { useRouterJump } from '@/hooks/useRouterJump'; 

const { pushRouter } = useRouterJump();

const goToRoute = () => {
  pushRouter('/indexPage', {
    query: {
      id: 'hjh'
    },
  })
}
</script>
<template>
  <div class="about">
    <h1>黄佳豪</h1>
    <el-Button @click="goToRoute">
      跳转路由
    </el-Button>
  </div>
</template>
<style lang="less">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.box {
  width: 100%;
  height: 100%;
  border: 1px solid black;
 
}
</style>
