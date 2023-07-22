<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { obtainKey } from '@/types'

const { x, y } = useMouse()
const router = useRouter()
const domType = ref<obtainKey<HTMLElementTagNameMap>>(['a', 'button', 'img']) // dom节点类型数组
const size = ref<number>(36)
const doms = ref<HTMLElement[]>([])

watch(
  () => router.currentRoute.value,
  () => {
    doms.value = []
    setTimeout(() => {
      init()
    }, 300)
  },
  { immediate: true }
)

const pelletStyle = computed(() => {
  return {
    '--pelletSize': `${size.value}px`,
    transform: `translate3d(${x.value - size.value / 2}px, ${y.value - size.value / 2}px, 0px)`,
    transition: `${0.75}s cubic-bezier(.16,1,.3,1)`
  }
})

const init = () => {
  const sizeNum: number = 36
  const doms: any = domType.value.reduce((doms: NodeList[] = [], b: string) => {
    const _d: any = document.querySelectorAll(b)
    doms.push(..._d)
    return doms
  }, [])
  doms.forEach((dom: HTMLElement) => {
    dom.addEventListener('mouseover', () => {
      size.value = sizeNum * 1.5
    })
    dom.addEventListener('mouseleave', () => {
      size.value = sizeNum
    })
  })
}
onMounted(() => {})
</script>
<template>
  <Teleport to="#app">
    <div class="pellet" :style="pelletStyle"></div>
  </Teleport>
</template>
<style lang="less" scoped>
.pellet {
  @apply rounded-1/2 border-1 absolute top-0 left-0 origin-center pointer-events-none border-dark-300 bg-transparent z-9999 dark:border-light-300;
  width: var(--pelletSize);
  height: var(--pelletSize);
}
</style>
