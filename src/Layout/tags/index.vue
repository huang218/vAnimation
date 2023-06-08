<script setup lang="ts"></script>
<template>
  <el-scrollbar class="w-full max-h-10">
    <div class="tag-list">
      <ul class="flex">
        <li
          v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
          :key="item"
          class="w-16 h-8 bg-dark-50 ml-1 hover:bg-light-600/30 cursor-pointer"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>
<style lang="less" scoped>
.tag-list {
  @apply flex items-center h-10 w-full bg-light-600/60 dark:bg-dark-600;
}
</style>
