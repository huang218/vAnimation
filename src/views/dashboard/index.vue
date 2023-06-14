<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { weatherType } from '@/types'
import { settingsStore } from '@/stores'
import { commonServer } from '@/apis'

const setting = settingsStore()

const weatherInfo = ref<weatherType>({})
const weathLoading = ref<boolean>(true)
const ulRef = ref(null)
const ind = ref(0)
const items = ref([
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' }
])
// const pushMathRender = () => {
//   items.value.push(Math.round(Math.random() * 100))
//   items.value.sort()
// }
// const deleteMathRender = () => {
//   let ramdomNum = Math.round(Math.random() * (items.value.length - 1)) // 随机list索引
//   items.value = items.value.filter((item, index) => {
//     if (index !== ramdomNum) return 1
//   })
//   items.value.sort()
// }

// const scroll = (scroll) => {
//   const boxHeight = ulRef.value.$el.offsetHeight - 22
//   console.log(scroll, boxHeight)
//   scrollJs(scroll.scrollTop, boxHeight)
// }

// const scrollJs = (curNum, offsetHeight) => {
//   const er = (curNum / offsetHeight) * items.value.length
//   if (ind.value != Math.round(er)) {
//     ind.value = Math.round(er)
//     console.log(Math.round(er), '该粘性定位的元素索引')
//   }
// }

const getWeather = async () => {
  weathLoading.value = true
  try {
    const { data } = await commonServer.region({ key: setting.weatherKey })
    if (data?.status === '1') {
      const { data: weatherDate } = await commonServer.weather({
        key: setting.weatherKey,
        city: data.adcode
      })
      weatherInfo.value = { ...weatherDate?.lives[0] }
      setTimeout(() => {
        weathLoading.value = false
      }, 500)
      console.log(weatherInfo, 'weather')
    }
  } catch (error) {
    console.error(error)
    weathLoading.value = false
  }
}
onMounted(() => {
  getWeather()
})
</script>

<template>
  <!-- <MainPage alias=""> -->
  <!-- <el-scrollbar noresize height="500px" @scroll="scroll">
      <div class="h-438px"></div>
      <TransitionGroup ref="ulRef" name="list" tag="ul">
        <li
          v-for="(item, index) in items"
          :key="item.name"
          :style="{ zIndex: items.length - index }"
          :class="index === ind ? 'li-sticky' : index > ind ? 'li-stickys-opacity' : ''"
          class="example"
        >
          {{ item.name }}
        </li>
      </TransitionGroup>
    </el-scrollbar> -->
  <!-- </MainPage> -->
  <el-skeleton :loading="weathLoading" animated :count="1">
    <template #template>
      <div style="padding: 14px">
        <el-skeleton-item variant="h3" style="width: 10%" />
        <div v-for="item in 3" :key="item" class="flex items-center justify-between mt-16px h-16px">
          <el-skeleton-item variant="text" class="flex-1 mr-2" />
          <el-skeleton-item variant="text" class="flex-1 mr-2" />
          <el-skeleton-item variant="text" class="flex-1" />
        </div>
      </div>
    </template>
    <template #default>
      <el-descriptions title="天气状况">
        <el-descriptions-item
          v-for="(value, key, index) in weatherInfo"
          :key="index"
          :label="`${key}：`"
          label-align="center"
        >
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </el-skeleton>
</template>

<style scoped lang="less">
.cur {
  :deep(.el-scrollbar) {
    position: relative;
    width: 320px;
    border: 1px solid #ccc;
    background: radial-gradient(circle at 60% 90%, rgba(46, 103, 161, 1), transparent 60%),
      radial-gradient(circle at 20px 20px, rgba(46, 103, 161, 0.8), transparent 25%), #182336;
  }
}
ul {
  width: 300px;
  margin: 0 auto;
  .li-stickys-opacity {
    bottom: 30px;
    opacity: 0;
  }
  .li-sticky {
    bottom: 30px;
    transform: scale(0.9);
  }
  .example {
    color: rgba(255, 255, 255, 0.8);
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(to top right, rgba(90, 149, 207, 0.5), rgba(58, 76, 99, 0.8));
    box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2), -10px 10px 20px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px); /*  元素后面区域添加模糊效果 */
  }
  li {
    position: sticky;
    height: 60px;
    width: 300px;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
    background-color: #858585;
    transition: all 0.5s;
  }
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.box {
  display: flex;
  width: 400px;
  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    flex-flow: column-reverse;
    .zz {
      width: 10px;
      height: 0px;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    & > span:first-child {
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.color1 {
  background: linear-gradient(#51251242, #6c3c12d1); /* 标准语法 */
}
.color2 {
  background: linear-gradient(#51251218, #6c3c1280); /* 标准语法 */
}
</style>
