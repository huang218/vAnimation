<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, isRef, unref, inject } from 'vue'
import type { reactiveType } from '@/types/view/home'
import { useDebouncedRef } from '@/hooks/useDebouncedRef'
import configGlobal from '@/global.vue'
import { WebLogger } from '@/utils' // 封装console
import Test from '@/components/Test.vue'

// inject 参数名称 默认值/或getter函数
const global = inject('provideInfo', 'default')
const ref1 = ref<number>(0)
const hei = ref<number>(10)
const deboNum = useDebouncedRef(0)
let anima = null

// 响应式最外层
// const reactive1 = shallowReactive<reactiveType>({
//   name: '123',
//   age: 11,
//   obj: {
//     name: 'obj'
//   }
// })
// 深层也会进行响应式
const reactive2 = reactive<reactiveType>({
  name: '456',
  age: 33,
  obj: {}
})
// computed设置get set
const getts = computed({
  get: () => {
    return ref1.value
  },
  set: (val) => {
    ref1.value = val
  }
})
/**
 * 清除动画
 */
const clearAnimation = () => {
  if (anima) cancelAnimationFrame(anima)
}
/**
 * requestAnimationFrame动画
 */
const boxAnimation = () => {
  anima = requestAnimationFrame(() => {
    if (hei.value <= 300) {
      hei.value += 100
      setTimeout(() => {
        boxAnimation()
      }, 1000)
    } else {
      clearAnimation()
    }
  })
}
const init = () => {
  hei.value = 10
  boxAnimation()
  WebLogger.log('123 WebLogger')
}
onMounted(() => {
  getts.value = 1
  console.log(
    getts.value,
    'getts|',
    isRef(ref1),
    'isRef|',
    unref(ref1),
    'unRef|',
    global,
    'provide-inject'
  )
  console.log(configGlobal.WS_URL)
})
watch(
  () => reactive2,
  (per, old) => {
    console.log(per, old, 'watch更新')
  },
  {
    // immdiate: true, // 首次加载执行
    deep: true // 深度监听
  }
)
// const clearWatch = watchEffect(() => {
//   console.log(ref1.value, '更新了')
// })
const changes = (prop) => {
  console.log('changes-emit', prop)
}
// clearWatch() 函数可以清楚watchEffect监听
</script>
<template>
  <div>
    <el-button @click="deboNum++">deboNum++</el-button>
    <el-button @click="reactive2.name = 'hjh'">替换</el-button>
    {{ reactive2.name }}
    {{ deboNum }}
    <Test @changes="changes" />
    <el-button @click="init">开启动画</el-button>
    <div class="flex w-200px justify-between">
      <div class="box" :style="{ height: `${hei}px` }"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.box {
  width: 150px;
  background-color: antiquewhite;
  transition: all 0.3s;
}
</style>
