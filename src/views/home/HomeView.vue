<script lang="ts" setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  shallowReactive,
  readonly,
  shallowReadonly,
  watch,
  watchEffect,
  isRef,
  unref,
  inject
} from 'vue'
import type { reactiveType } from '@/types/view/home'
import { useDebouncedRef } from '@/hooks/useDebouncedRef'
import Test from '@/components/Test.vue'

// inject 参数名称 默认值/或getter函数
const global = inject('provideInfo', 'default')
const ref1 = ref<number>(0)
const deboNum = useDebouncedRef(0)

// 响应式最外层
const reactive1 = shallowReactive<reactiveType>({
  name: '123',
  age: 11,
  obj: {
    name: 'obj'
  }
})
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
const clearWatch = watchEffect(() => {
  console.log(ref1.value, '更新了')
})
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
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
