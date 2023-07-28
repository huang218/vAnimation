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
  <div style="display: none">
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
  <div class="crad">
    <div class="c1">
      <p>主文字1</p>
      以三维场景为依托、生产数据为核心、生产业务为纽带，为工厂打造数字孪生空间，赋能企业安全生产、高效管理和智慧运营，为企业降本、创收，推动工厂、车间、产能的数字化转型。
    </div>
    <div class="c2">
      <p>主文字2</p>
      以三维场景为依托、生产数据为核心、生产业务为纽带，为工厂打造数字孪生空间，赋能企业安全生产、高效管理和智慧运营，为企业降本、创收，推动工厂、车间、产能的数字化转型。
    </div>
    <div class="c3">
      <p>主文字3</p>
      以三维场景为依托、生产数据为核心、生产业务为纽带，为工厂打造数字孪生空间，赋能企业安全生产、高效管理和智慧运营，为企业降本、创收，推动工厂、车间、产能的数字化转型。
    </div>
    <div class="c4">
      <p>主文字4</p>
      以三维场景为依托、生产数据为核心、生产业务为纽带，为工厂打造数字孪生空间，赋能企业安全生产、高效管理和智慧运营，为企业降本、创收，推动工厂、车间、产能的数字化转型。
    </div>
  </div>
</template>

<style lang="less" scoped>
.crad {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
  margin: 0 auto;
  div {
    flex: 1;
    height: 400px;
    margin: 0 10px;
    padding: 10px;
    // color: #000;
    font-size: 14px;
    cursor: pointer;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.3s ease-in-out;
    filter: grayscale(1);
    p {
      font-size: 20px;
      font-weight: 600;
    }
  }
  div:hover {
    flex: 3;
    color: #fff;
    filter: none;
  }
  .c1 {
    background-image: url('@/assets/image/iotBig.png');
  }
  .c2 {
    background-image: url('@/assets/image/mesBig.png');
  }
  .c3 {
    background-image: url('@/assets/image/nextBig.png');
  }
  .c4 {
    background-image: url('@/assets/image/numBig.png');
  }
}
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
