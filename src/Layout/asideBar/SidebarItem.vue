<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<script setup lang="ts">
import { isHide, hasChildren } from '@/utils'
import { settingsStore, tagViewStore } from '@/stores'
import { Menu } from '@/types'
const props = defineProps<{
  route: Menu
  isIcon: Boolean
}>()

const settingsConfig = settingsStore()
const tagStore = tagViewStore()

const menuClick = () => {
  tagStore.addTagView(props.route)
}
</script>
<template>
  <div
    v-if="!isHide(route)"
    class="w-full sidebar-item"
    :class="{ 'is-collapsed': settingsConfig.config.isCollapsed }"
  >
    <template v-if="!hasChildren(route)">
      <el-menu-item
        class="sub-menu active:text-$el-color-primary-light-7 hover:(text-$el-color-primary-light-2 bg-transparent) select-none"
        :index="route.path"
        @click="menuClick"
      >
        <template #title>
          <el-icon>
            <component :is="route.meta.icon" />
          </el-icon>
          <span class="ml-3.5">{{ route.meta.title }}</span>
        </template>
        <el-icon v-if="settingsConfig.config.isCollapsed && isIcon">
          <component :is="route.meta.icon" />
        </el-icon>
      </el-menu-item>
    </template>
    <el-sub-menu
      v-else
      class="sub-menu active:text-$el-color-primary-light-7 hover:(text-$el-color-primary-light-2 bg-transparent) select-none"
      :index="route.path"
      teleported
    >
      <template #title>
        <el-icon>
          <component :is="route.meta.icon" />
        </el-icon>
        <span class="ml-3.5">{{ route.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in route.children"
        :key="child.id"
        :route="child"
        :is-icon="false"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  .sub-menu {
    color: var(--menu-default-color);
    :deep(.el-sub-menu__title) {
      color: var(--menu-default-color);
      padding-right: 0px;
      &:hover {
        color: var(--el-menu-active-color);
      }
    }

    &.el-menu-item:hover {
      color: var(--el-menu-active-color);
    }
    &.el-menu-item.is-active {
      // color: var(--text-color);
      color: var(--el-menu-active-color);
      background-color: var(--color-bg);
    }
  }
  &.is-collapsed {
    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
}
</style>
