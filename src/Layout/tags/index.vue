<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick, inject, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { tagViewStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { Menu, Client, MenuType } from '@/types'

const rightClickType: Record<MenuType, Symbol> = {
  Reload: Symbol('reload'),
  CloseLeft: Symbol('closeLeft'),
  CloseRight: Symbol('closeRight'),
  CloseOrther: Symbol('closeOrther'),
  CloseAll: Symbol('closeAll')
}
const tagStore = tagViewStore()
const { visitedViews, currentView, cachedViews } = storeToRefs(tagStore)
const { pushRouter } = useRouterJump()
const reload = inject<Function>('reload')
const menuIsShow = ref<boolean>(false)
const menuWidth = ref<number>(100)
const currentRouteInfo = ref<Partial<Menu>>({})
const clientXY = ref<Record<Client, number>>({
  clientX: 0,
  clientY: 0
})

watch(
  () => currentView.value,
  (newValue) => {
    pushRouter(newValue)
  }
)
const positionInfo = computed(() => {
  return {
    top: `${clientXY.value.clientY}px`,
    left: `${clientXY.value.clientX}px`,
    width: `${menuWidth.value}px`
  }
})
const tagClick = (route: Menu) => {
  tagStore.addCurrentView(route.path)
}
const rightclick = async (route, index, event) => {
  let { clientX, clientY } = event
  const { innerWidth } = window
  if (innerWidth < clientX + menuWidth.value) {
    clientX = innerWidth - menuWidth.value
  }
  clientXY.value = { clientX, clientY }
  currentRouteInfo.value = route
  await nextTick()
  menuIsShow.value = true
}
const iconClose = (route: Menu) => {
  tagStore.deleteTagView(route)
}

const menuFun = (type: Symbol) => {
  if (visitedViews.value.length <= 1) return
  const { Reload, CloseLeft, CloseRight, CloseOrther, CloseAll } = rightClickType
  const oldRoute = visitedViews.value.map((item) => {
    if (item.path === currentView.value) return item.name
  })
  const isPushRoute = currentRouteInfo.value.path !== currentView.value
  switch (type) {
    case Reload:
      reload()
      break
    case CloseLeft:
      tagStore.closeLeftTagView(currentRouteInfo.value as Menu)
      break
    case CloseRight:
      tagStore.closeRightTagView(currentRouteInfo.value as Menu)
      break
    case CloseOrther:
      tagStore.closeOtherTagView(currentRouteInfo.value as Menu)
      break
    case CloseAll:
      tagStore.closeAllTagView()
      tagStore.addCurrentView('/dashboard')
      break
    default:
      console.log('default')
      break
  }
  if (isPushRoute && !unref(cachedViews).includes(oldRoute[0]) && (type !== CloseAll || Reload)) {
    tagStore.addCurrentView(currentRouteInfo.value.path)
  }
}
onMounted(() => {
  document.onclick = function () {
    menuIsShow.value = false
    currentRouteInfo.value = {}
  }
})
</script>
<template>
  <el-scrollbar class="w-full max-h-10">
    <div class="tag-list">
      <TransitionGroup name="tag" tag="ul" class="flex pr-1 relative">
        <li
          v-for="(item, index) in visitedViews"
          :key="item.path"
          :class="`tag ${currentView === item.path ? 'tagSelect' : 'tagNoSelect'}`"
          @click="tagClick(item)"
          @contextmenu.prevent="rightclick(item, index, $event)"
        >
          <span>{{ item.name }}</span>
          <el-icon v-if="!item.meta.isAffix" @click.stop="iconClose(item)">
            <component :is="'Close'" />
          </el-icon>
        </li>
      </TransitionGroup>
      <Teleport to="body">
        <ul v-show="menuIsShow" class="rightMenu" :style="positionInfo">
          <li
            v-show="currentView === currentRouteInfo.path"
            @click="menuFun(rightClickType.Reload)"
          >
            刷新
          </li>
          <li @click="menuFun(rightClickType.CloseLeft)">关闭左侧</li>
          <li @click="menuFun(rightClickType.CloseRight)">关闭右侧</li>
          <li @click="menuFun(rightClickType.CloseOrther)">关闭其他</li>
          <li @click="menuFun(rightClickType.CloseAll)">关闭全部</li>
        </ul>
      </Teleport>
    </div>
  </el-scrollbar>
</template>
<style lang="less" scoped>
:deep(.el-scrollbar__bar) {
  z-index: 10;
}
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
    text-12px
    px-1
    ml-1
    h-8
    z-4
    leading-8
    rounded-4px
    min-w-16
    transition
    text-center
    cursor-pointer
    border
    border-gray-300
    dark:border-gray-500/60;
    &:hover {
      @apply bg-light-800 dark:bg-dark-50;
    }
    :deep(.el-icon) {
      @apply rounded-1/2;
      &:hover {
        @apply bg-light-50 dark: bg-dark-500;
      }
    }
    span {
      @apply block w-full whitespace-nowrap mx-2;
    }
  }
  // 选中tag style
  .tagSelect {
    @apply bg-light-800 dark:bg-dark-50;
  }
  // 未选中tag style
  .tagNoSelect {
    @apply bg-light-50 dark:bg-dark-500;
  }

  .tag-move, /* 对移动中的元素应用的过渡 */
  .tag-enter-active,
  .tag-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .tag-enter-from {
    opacity: 0;
    transform: translate(30px, 0);
    z-index: 1;
  }
  .tag-leave-to {
    opacity: 0;
    transform: scale(0.5) translateX(30px);
    z-index: 1;
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .tag-leave-active {
    position: absolute;
  }
}
</style>
<style lang="less">
.rightMenu {
  @apply absolute top-0 left-0 z-999 text-14px h-auto p-4px rounded-6px overflow-hidden bg-light-50 shadow-md  dark: shadow-gray-800 dark: bg-dark-600;
  li {
    @apply h-25px text-center rounded-4px leading-25px cursor-pointer dark: text-light-500;
    &:hover {
      @apply bg-light-800 dark: bg-dark-50;
    }
  }
}
</style>
