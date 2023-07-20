<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { tagViewStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { Menu } from '@/types'

const tagStore = tagViewStore()
const { visitedViews, currentView } = storeToRefs(tagStore)
const { pushRouter } = useRouterJump()

const tagClick = (route: Menu) => {
  tagStore.addCurrentView(route.path)
}
const iconClose = (route: Menu) => {
  tagStore.deleteTagView(route)
}
watch(
  () => currentView.value,
  (newValue) => {
    pushRouter(newValue)
  }
)
</script>
<template>
  <el-scrollbar class="w-full max-h-10">
    <div class="tag-list">
      <ul class="flex pr-1">
        <li
          v-for="item in visitedViews"
          :key="item.path"
          :class="`tag ${currentView === item.path ? 'tagSelect' : 'tagNoSelect'}`"
          @click="tagClick(item)"
        >
          <span>{{ item.name }}</span>
          <el-icon v-if="!item.meta.isAffix" @click.stop="iconClose(item)">
            <component :is="'Close'" />
          </el-icon>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>
<style lang="less" scoped>
.tag-list {
  @apply flex
  items-center
  h-10
  w-full
  bg-light-600/60
  dark:bg-dark-600;
  .tag {
    @apply flex
    justify-between
    items-center
    text-14px
    px-1
    ml-1
    h-8
    leading-8
    rounded-4px
    min-w-16
    transition
    text-center
    cursor-pointer;
    &:hover span {
      @apply text-blue-400;
    }
    span {
      @apply block w-full whitespace-nowrap;
    }
  }
  // 选中tag style
  .tagSelect {
    @apply bg-blue-400 dark:bg-dark-50;
  }
  // 未选中tag style
  .tagNoSelect {
    @apply bg-blue-200 dark:bg-dark-300;
  }
}
</style>
