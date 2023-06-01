<script setup lang="ts">
import { tagViewStore } from '@/stores'
import { Menu } from '@/types';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
const tagViewState = tagViewStore();
const cachedViews = computed(() => tagViewState.cachedViews) as any;
const route = useRoute();
const cloneRoute = computed(() => {
  return {
    name: route.name,
    path: route.path,
    meta: route.meta,
  };
}) as any;
watch(
  cloneRoute,
  (newRoute: Menu) => {
    if (newRoute.meta.isTagView) {
      tagViewState.addTagView(newRoute);
    }
  },
  { immediate: true }
);

</script>
<template>
  <el-container class="main-box overflow-hidden p-2.5">
    <div class="w-full h-auto p-2.5 rounded-6px bg-light-600 dark:bg-dark-600">
      <router-view  v-slot="{ Component, route }">
        <transition name="slide-fade" appear mode="out-in">
          <div :key="route.path" class="h-full w-full" >
            <!-- :include="cachedViews" -->
            <keep-alive :max="4">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </div>
        </transition>
      </router-view>
    </div>
  </el-container>
</template>
<style lang="less" scoped>
.main-box {
  flex: 1;
  background-color: var(--el-bg-color);
}

</style>