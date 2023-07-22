<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Loading from '@/components/Loading/index.vue'
import AsideBar from '@/Layout/asideBar/index.vue'
import Header from '@/Layout/header/index.vue'
import Tags from '@/Layout/tags/index.vue'
import Main from '@/Layout/main/index.vue'
import FollowMove from '@/components/FollowMove/index.vue'
import { nextTick, provide, ref } from 'vue'

const locale = ref(zhCn)

const isRouterAlive = ref(true)
/**
 * 组件刷新
 * */
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>
<template>
  <el-config-provider :locale="locale">
    <div class="common-layout">
      <el-container class="h-fulls">
        <Header />
        <div class="flex-column">
          <AsideBar />
          <div class="flex flex-col h-full flex-1 content-box transition-bgc">
            <Tags />
            <Main v-if="isRouterAlive" />
          </div>
        </div>
      </el-container>
    </div>
    <!-- loading -->
    <Loading></Loading>
    <FollowMove></FollowMove>
  </el-config-provider>
</template>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .h-fulls {
    height: 100vh;
    flex-direction: column;
    .flex-column {
      display: flex;
      height: calc(100vh - 60px);
      .content-box {
        width: calc(100% - 200px);
      }
    }
  }
}
</style>
