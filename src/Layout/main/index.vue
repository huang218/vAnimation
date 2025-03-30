<!--
 * @Form: Page
 * @Date: 2023-07-22 22:34:24
 * @time: Do not edit
 * @author: huangjiahao
-->
<script setup lang="ts">
import routeView from '../routeView/index.vue'
</script>
<template>
  <el-container class="main-box transition-bgc overflow-hidden p-2.5 relative">
    <div class="transition w-full h-auto p-2.5 rounded-6px bg-light-600/60 dark:bg-dark-600">
      <routeView />
    </div>
  </el-container>
</template>
<style lang="less" scoped>
.main-box {
  // flex: 1;
  background-color: var(--el-bg-color);
  // background-color: transparent;
}
</style>
