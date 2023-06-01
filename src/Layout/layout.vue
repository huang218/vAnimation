<script setup lang="ts">
import AsideBar from '@/Layout/asideBar/index.vue';
import Header from '@/Layout/header/index.vue';
import Main from '@/Layout/main/index.vue';
</script>
<template>
  <div class="common-layout">
    <el-container class="h-full">
      <Header />
      <div class="flex-column">
        <AsideBar />
        <Main />
      </div>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .h-full {
    height: 100vh;
    flex-direction: column;
    .flex-column {
      display: flex;
      height: calc(100vh - 60px);
    }
  }
}
</style>