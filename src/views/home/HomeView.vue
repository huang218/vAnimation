<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import configGlobal from '@/global.vue'
import { WebLogger } from '@/utils' // 封装console

enum as {
  ONE,
  TWO
}
const marr = {
  [as.ONE]: 'one',
  [as.TWO]: 'two'
}
// inject 参数名称 默认值/或getter函数
const scrollBox = ref<HTMLElement | null>(null)
const step = ref<number>(40)
const duration = ref<number>(2000)
const scrollNum = ref<number>(0)
const isOpenTransition = ref<boolean>(true)
let anima = null

const num = ref<number>(10)
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
    if (scrollBox.value.offsetHeight / 2 === scrollNum.value) {
      isOpenTransition.value = false
      nextTick(() => {
        scrollNum.value = 0
        scrollBox.value.style.bottom = '0px'
        // isOpenTransition.value = true
      })
      boxAnimation()
      return
    }
    if (scrollBox.value.offsetHeight / 2 > scrollNum.value) {
      scrollNum.value += step.value
      scrollBox.value.style.bottom = `${scrollNum.value}px`
    }

    console.log(scrollBox.value.offsetHeight, scrollBox.value.getBoundingClientRect())
    setTimeout(() => {
      boxAnimation()
    }, 3500)
  })
}
const init = () => {
  console.log(scrollBox.value.getBoundingClientRect(), 'scrollBox.value.getBoundingClientRect()')

  setTimeout(() => {
    boxAnimation()
  }, 2000)
}
const pushData = () => {
  num.value++
}
onMounted(() => {
  console.log(configGlobal.WS_URL)
})
</script>
<template>
  <div>
    <span>{{ marr }}</span>
    <el-button @click="pushData">push数据</el-button>
    <el-button @click="init">开启动画</el-button>
    <div class="w-300px h-200px overflow-hidden m-9">
      <div
        ref="scrollBox"
        :class="`scroll flex w-300px h-400px justify-between flex-col relative `"
      >
        <ul class="box">
          <li v-for="item in num" :key="item">{{ item }}</li>
        </ul>
        <ul class="box">
          <li v-for="item in num" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.scroll {
  transition: all 1s ease-in;
}
.box {
  width: 150px;
  transition: all 0.5s;
  li {
    height: 18px;
    line-height: 20px;
    text-align: center;
    color: #000;
    background-color: aquamarine;
    margin-top: 2px;
  }
}
</style>
