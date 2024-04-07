<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { routerStore } from '@/stores/index'
import { useRouterJump } from '@/hooks/useRouterJump'
import { Expand, Fold } from '@element-plus/icons-vue'
import { settingsStore } from '@/stores'
const settingGlobal = settingsStore()
const { config } = storeToRefs(settingGlobal)

const { pushRouter } = useRouterJump()
const routerStoreConfig = routerStore()
const { routerList, curRootRoute } = storeToRefs(routerStoreConfig)

const handleSelect = (key: string) => {
  routerStoreConfig.getCurrentRoute(key)
}
</script>
<template>
  <div class="flex header-left">
    <div class="title">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" @click="pushRouter('/')" />
      <h1 class="name">Vue3 PC</h1>
    </div>
    <div class="collapse">
      <el-icon @click="settingGlobal.setIsCollapsed(!config.isCollapsed)">
        <component :is="config.isCollapsed ? Expand : Fold" />
      </el-icon>
    </div>
    <el-menu
      :default-active="curRootRoute"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in routerList" :key="item.path" :index="item.path">
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
:deep(.el-menu--horizontal) {
  border-bottom: none;
  height: 100%;
  border-bottom: solid 1px var(--el-menu-border-color);
}
.header-left {
  height: 100%;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    .name {
      height: 58px;
      width: auto;
      font-weight: 600;
      // background-color: var(--el-bg-color);
      background-color: transparent;
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
  .collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 60px;
    font-size: 30px;
    :deep(.el-icon) {
      cursor: pointer;
      &:hover {
        color: var(--el-menu-active-color);
      }
    }
  }
  .el-menu-demo {
    width: calc(100% - 200px);
    background-color: transparent !important;
  }
}
</style>
