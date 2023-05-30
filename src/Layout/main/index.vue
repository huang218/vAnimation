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
    <div class="w-full h-auto">
      <router-view  v-slot="{ Component }">
        <transition name="slide-right" appear mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </el-container>
</template>
<style lang="less" scoped>
.main-box {
  flex: 1;
  background-color: bisque;
}
</style>