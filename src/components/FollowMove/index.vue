<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

const { x, y } = useMouse()
const size = ref<number>(36)
const pelletStyle = computed(() => {
  return {
    '--pelletSize': `${size.value}px`,
    transform: `translate3d(${x.value - size.value / 2}px, ${y.value - size.value / 2}px, 0px)`,
    transition: `${0.75}s cubic-bezier(.16,1,.3,1)`
  }
})
const mouseEvent = () => {
  console.log('gotpointercapture')
}
onMounted(() => {
  window.addEventListener('gotpointercapture', (event) => {
    console.log(event, 'moveEvent')
  })
})
</script>
<template>
  <div class="pellet" :style="pelletStyle"></div>
</template>
<style lang="less" scoped>
.pellet {
  @apply border-light-300 bg-transparent rounded-1/2 border-2 absolute top-0 left-0 origin-center pointer-events-none;
  width: var(--pelletSize);
  height: var(--pelletSize);
}
</style>
