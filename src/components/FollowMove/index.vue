<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const { x, y } = useMouse()
const router = useRouter()
const size = ref<number>(36)
const pelletStyle = computed(() => {
  return {
    '--pelletSize': `${size.value}px`,
    transform: `translate3d(${x.value - size.value / 2}px, ${y.value - size.value / 2}px, 0px)`,
    transition: `${0.75}s cubic-bezier(.16,1,.3,1)`
  }
})

watch(
  () => router.currentRoute.value,
  () => {
    nextTick(() => {
      init()
    })
  },
  { immediate: true }
)
const init = () => {
  const aDom = Array.from(document.querySelectorAll('a'))
  const buttonDom: any[] = Array.from(document.querySelectorAll('button'))
  const doms = aDom.concat(buttonDom)
  console.log(doms, 'dom', buttonDom)

  doms.forEach((dom) => {
    dom.addEventListener('mouseover', () => {
      size.value = 54
    })
    dom.addEventListener('mouseleave', () => {
      size.value = 36
    })
  })
}
onMounted(() => {})
</script>
<template>
  <div class="pellet" :style="pelletStyle"></div>
</template>
<style lang="less" scoped>
.pellet {
  @apply rounded-1/2 border-1 absolute top-0 left-0 origin-center pointer-events-none border-dark-300 bg-transparent z-9999 dark:border-light-300;
  width: var(--pelletSize);
  height: var(--pelletSize);
}
</style>
