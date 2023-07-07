<script setup lang="ts">
import routeView from '../routeView/index.vue'
</script>
<template>
  <el-container class="main-box overflow-hidden p-2.5 relative">
    <div class="w-full h-auto p-2.5 rounded-6px bg-light-600/60 dark:bg-dark-600">
      <routeView />
      <!-- 区域loading -->
    </div>
  </el-container>
</template>
<style lang="less" scoped>
.main-box {
  // flex: 1;
  background-color: var(--el-bg-color);
}
</style>
