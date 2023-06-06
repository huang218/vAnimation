<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouterJump } from '@/hooks/useRouterJump'

const { goRouter } = useRouterJump()
const currentRoute = useRoute()

const onBack = () => {
  goRouter(-1)
}
const curRoute = computed(() => {
  return currentRoute.path.split('/').filter((item) => item != '')
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
          <span class="text-large font-600 mr-3"> 详情 </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
            View Detail
          </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center"></div>
      </template>

      <template #default> </template>
    </el-page-header>
  </div>
</template>
<style scoped lang="less"></style>
