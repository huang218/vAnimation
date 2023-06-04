<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterJump } from '@/hooks/useRouterJump';
const { goRouter } = useRouterJump();
const currentRoute = useRoute();

const onBack = () => {
  goRouter(-1)
}
const curRoute = computed(() => {
  return currentRoute.path.split('/').filter(item => item != '');
})
</script>

<template>
  <div class="main-hjh-box w-full h-full">
    <el-page-header class="box h-full flex flex-col" @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in curRoute" :key="index">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #title>
        <span class="hover:text-blue-400">Back</span>
      </template>
      <template #content>
        <div class="flex items-center">
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> 工作台 </span>
          <span
            class="text-sm mr-2"
            style="color: var(--el-text-color-regular)"
          >
            首页展示
          </span>
          <!-- <el-tag>Default</el-tag> -->
        </div>
      </template>
      
      <template #default>
        <el-scrollbar>
          <slot></slot>
        </el-scrollbar>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped lang="less">
// main区域充满剩余高度 
:deep(.el-page-header__main) {
  flex: 1 !important;
  height: 0;
}
</style>
