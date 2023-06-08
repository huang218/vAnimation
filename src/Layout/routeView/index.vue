<script setup lang="ts">
import { tagViewStore } from '@/stores'
import { Menu } from '@/types'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const tagViewState = tagViewStore()
const cachedViews = computed(() => tagViewState.cachedViews) as any
const route = useRoute()
const cloneRoute = computed(() => {
  return {
    name: route.name,
    path: route.path,
    meta: route.meta
  }
}) as any
watch(
  cloneRoute,
  (newRoute: Menu) => {
    if (newRoute.meta.isTagView) {
      tagViewState.addTagView(newRoute)
    }
  },
  { immediate: true }
)
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" appear mode="out-in">
      <!-- :include="cachedViews" -->
      <div :key="route.path" class="h-full w-full">
        <keep-alive :max="3">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>
<style lang="less" scoped></style>
