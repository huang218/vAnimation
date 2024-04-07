<script setup lang="ts">
import { ref } from 'vue'

const val = ref<any>(0)
</script>

<template>
  <div>
    menu-1-1
    <el-input v-model="val"></el-input>
  </div>
</template>
<style lang="scss" scoped></style>
