<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue';
import { routerStore } from '@/stores/index';
import { useRoute } from 'vue-router';
const routerStoreConfig = routerStore();
const { routerList } = routerStoreConfig.$state;
const currentRoute = useRoute();
const activeMenu = computed(() => currentRoute.path);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleOpen')
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleClose')
}
</script>
<template>
  <div class="menu">
    <el-aside width="200px">
      <el-scrollbar class="flex-1">
        <el-col :span="24">
          <h1 class="logo mb-2">Default colors</h1>
        </el-col>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo menus"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- <SidebarItem v-for="item in routerList" :key="item.id" :route="item" /> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
<style lang="less" scoped>
.menu {
  .logo {
    height: 60px;
    width: 100%;
    background-color: rgb(67, 67, 67);
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
  }
  .menus {
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
}
</style>