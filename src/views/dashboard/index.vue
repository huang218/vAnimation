<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>工作台</div>
  <el-Button @click="toggleDark()">主题</el-Button>
</template>

<style scoped>

</style>
