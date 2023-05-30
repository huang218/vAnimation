<template>
  <!-- :class="{ 'is-collapsed': settingsConfig.config.isCollapsed }" -->
  <div v-if="!isHide(route)" class="w-full sidebar-item" >
    <template v-if="!hasChildren(route)">
      <el-menu-item class="sub-menu active:text-$el-color-primary-light-7 hover:(text-$el-color-primary-light-2 bg-transparent) select-none" :index="route.path">
        <template #title>
          <!-- <svg-icon :name="route.meta.icon"></svg-icon> -->
          <el-icon><Document /></el-icon>
          <span class="ml-3.5">{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else class="sub-menu active:text-$el-color-primary-light-7 hover:(text-$el-color-primary-light-2 bg-transparent) select-none" :index="route.path" teleported>
      <template #title>
        <!-- <svg-icon :name="route.meta.icon"></svg-icon> -->
          <el-icon><IconMenu /></el-icon>
        <span class="ml-3.5">{{ route.meta.title }}</span>
      </template>
      <SidebarItem v-for="child in route.children" :key="child.id" :route="child" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
export default {
  name: "SidebarItem",
};
</script>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { isHide, hasChildren } from "@/utils";
import { toRefs } from "vue";
// import { settingsStore } from "@/store";
import { Menu } from "@/types";
const props = defineProps<{ route: Menu }>();
// const { route } = toRefs(props);
// const settingsConfig = settingsStore();
</script>

<style lang="scss" scoped>
.sidebar-item {
  .sub-menu {
    color: var(--menu-default-color);
    :deep(.el-sub-menu__title) {
      color: var(--menu-default-color);
      padding-right: 0px;
      &:hover {
        color: var(--el-color-primary-light-2);
      }
    }
    &.el-menu-item.is-active {
      background-color: transparent;
      color: var(--el-color-primary-light-2);
    }
  }
  &.is-collapsed {
    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
  .svg-icon {
    font-size: 16px;
  }
}
</style>
