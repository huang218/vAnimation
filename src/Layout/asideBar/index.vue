<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import SidebarItem from './SidebarItem.vue';
import { routerStore } from '@/stores/index';
import { useRoute } from 'vue-router';
import { useRouterJump } from '@/hooks/useRouterJump';


const { pushRouter } = useRouterJump();
const routerStoreConfig = routerStore();
const { routerList } = routerStoreConfig.$state;
const currentRoute = useRoute();
const activeMenu = computed(() => currentRoute.path);


onMounted(() => {
})

</script>
<template>
  <div class="menu">
    <el-aside width="200px">
      <el-scrollbar class="flex-1">
        <el-col :span="24" class="title">
          <img 
            src="@/assets/vue.svg" 
            class="logo vue" 
            alt="Vue logo" 
            @click="pushRouter('/')"  
          />
          <h1 class="name">Vue</h1>
        </el-col>
        <el-menu
          router
          :default-active="activeMenu"
          mode="vertical"
          class="el-menu-vertical-demo menus"
          :collapse-transition="false"
          :uniqueOpened="true"
        >
          <SidebarItem v-for="item in routerList" :key="item.id" :route="item" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
<style lang="less" scoped>
.menu {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid 1px var(--el-menu-border-color);
    .name {
      height: 60px;
      width: auto;
      font-weight: 600;
      background-color: var(--el-bg-color);
      color: var(--el-text-color-primary);
      line-height: 60px;
      text-align: center;
      font-size: 20px;
    }
    .logo {
      height: 50px;
      // padding: ;
      will-change: filter;
      transition: filter 300ms;
      cursor: pointer;
    }
    .logo:hover {
      filter: drop-shadow(0 0 0.5em #3c46fea7);
    }
    .logo .vue:hover {
      filter: drop-shadow(0 0 0.5em #30ea96a5);
    }
  }

  .menus {
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
}
</style>