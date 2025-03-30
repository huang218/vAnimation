<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, onMounted, ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtainKey } from '@/types'

// 改用ref手动控制位置，而不是直接使用useMouse
const mousePosition = ref({ x: 0, y: 0 })
const targetPosition = ref({ x: 0, y: 0 })
const { x, y } = useMouse()

const router = useRouter()
const domType = ref<obtainKey<HTMLElementTagNameMap>>(['a', 'img']) // dom节点类型数组
const size = ref<number>(36)
const targetSize = ref<number>(36) // 目标大小
const doms = ref<HTMLElement[]>([])
let animationFrameId: number | null = null

// 监听鼠标位置并更新目标位置
watch([x, y], ([newX, newY]) => {
  targetPosition.value = { x: newX, y: newY }
})

// 使用requestAnimationFrame实现平滑跟随
const updatePosition = () => {
  // 计算当前位置和目标位置之间的差距
  const dx = targetPosition.value.x - mousePosition.value.x
  const dy = targetPosition.value.y - mousePosition.value.y

  // 调整缓动系数为0.1，使跟随有更明显的延迟感
  mousePosition.value.x += dx * 0.1
  mousePosition.value.y += dy * 0.1

  // 平滑过渡大小变化
  const dSize = targetSize.value - size.value
  size.value += dSize * 0.1

  // 继续下一帧动画
  animationFrameId = requestAnimationFrame(updatePosition)
}

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

// 修改计算样式，使用mousePosition而不是直接使用x,y
const pelletStyle = computed(() => {
  return {
    '--pelletSize': `${size.value}px`,
    transform: `translate3d(${mousePosition.value.x - size.value / 2}px, ${
      mousePosition.value.y - size.value / 2
    }px, 0px)`
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
      // 更改目标大小而不是直接更改大小
      targetSize.value = sizeNum * 1.5
    })
    dom.addEventListener('mouseleave', () => {
      // 更改目标大小而不是直接更改大小
      targetSize.value = sizeNum
    })
  })
}

onMounted(() => {
  // 初始化位置和大小
  mousePosition.value = { x: x.value, y: y.value }
  targetPosition.value = { x: x.value, y: y.value }
  size.value = 36
  targetSize.value = 36

  // 启动动画循环
  animationFrameId = requestAnimationFrame(updatePosition)
})

onUnmounted(() => {
  // 清理动画帧，防止内存泄漏
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>
<template>
  <Teleport to="body">
    <div class="pellet" :style="pelletStyle"></div>
  </Teleport>
</template>
<style lang="less" scoped>
.pellet {
  @apply rounded-1/2 border-1 absolute top-0 left-0 origin-center pointer-events-none border-dark-300 bg-transparent z-9999 dark:border-light-300;
  width: var(--pelletSize);
  height: var(--pelletSize);
  will-change: transform, width, height;
}
</style>
