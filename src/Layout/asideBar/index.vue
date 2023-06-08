<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import SidebarItem from './SidebarItem.vue'
import { routerStore, settingsStore } from '@/stores/index'

const currentRoute = useRoute()
const settingGlobal = settingsStore()
const routerStoreConfig = routerStore()

const { config } = storeToRefs(settingGlobal)
const { sideBarRouter } = storeToRefs(routerStoreConfig)

const activeMenu = computed(() => currentRoute.path)
</script>
<template>
  <div class="menu" :style="{ width: config.isCollapsed ? '64px' : '200px' }">
    <el-aside width="100%">
      <el-menu
        router
        mode="vertical"
        class="el-menu-vertical-demo menus"
        :collapse="config.isCollapsed"
        :default-active="activeMenu"
        :collapse-transition="true"
      >
        <!-- <transition name="slide-fade" appear mode="out-in"> -->
        <el-scrollbar max-height="100%">
          <SidebarItem v-for="item in sideBarRouter" :key="item.id" :route="item" :is-icon="true" />
        </el-scrollbar>
        <!-- </transition> -->
      </el-menu>
    </el-aside>
  </div>
</template>
<style lang="less" scoped>
.menu {
  width: auto;
  transition: all 0.4s;
  // :deep(.el-aside) {
  //   transition: all 0.8s;
  // }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .menus {
    // height: calc(100vh - 60px);
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
