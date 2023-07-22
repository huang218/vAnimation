<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'change', event: Boolean): void
}>()
const isClose = ref(false)
const btnClick = () => {
  isClose.value = !isClose.value
  emit('change', !isClose.value)
}
</script>
<template>
  <div :class="`btn ${isClose ? 'clickStatus' : ''}`" @click="btnClick">
    <i class="line"></i>
    <i class="line"></i>
  </div>
</template>
<style lang="less" scoped>
.btn {
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  @apply flex flex-col justify-evenly items-center border-dark-600 bg-transparent dark:border-light-600;
  .line {
    transform-origin: 16% 50%;
    @apply transform
      block
      w-30px
      h-3px
      rounded-2px
      rotate-0
      transition-transform
      transition-width
      duration-200
      bg-dark-600
      dark:bg-light-600;
  }
  // .line:first-child {
  //   @apply top-15px;
  // }
  // .line:last-child {
  //   @apply top-25px;
  // }
}
.clickStatus {
  // .line {
  //   @apply translate-x-2px;
  // }
  .line:first-child {
    @apply rotate-45;
  }
  .line:last-child {
    @apply -rotate-45;
  }
}
</style>
