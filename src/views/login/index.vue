<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { useModel } from './hooks/useModel'
import { animation } from '@/utils'

const { container, curModelIndex, loading } = useModel()
const { replaceRouter } = useRouterJump()
const { getUserInfo } = userStore()

const opacity = reactive<Record<'val', number>>({
  val: 0
})
const formLabelAlign = reactive({
  name: '',
  password: ''
})

watch(
  () => loading.value,
  (val) => {
    // to -> 0 : 隐藏
    // to -> 1 : 显示
    if (!val) return
    opacity.val = 0
    animation({
      from: opacity,
      to: { val: 1 },
      duration: 0.8 * 1000,
      onUpdate: (obj: any) => {
        opacity.val = obj.val
      },
      onComplete: () => {}
    })
  },
  {
    immediate: true
  }
)

async function submit() {
  const datas = await getUserInfo()
  if (datas) {
    replaceRouter('/')
  }
}

onMounted(() => {
  false &&
    setInterval(() => {
      if (curModelIndex.value >= 5) {
        curModelIndex.value = 1
        return
      }
      curModelIndex.value++
    }, 30 * 1000)
})
</script>
<template>
  <div class="login-box relative">
    <div class="h-full flex-1">
      <div
        class="w-full h-full flex items-center"
        :style="{ opacity: opacity.val, background: 'transparent' }"
      >
        <div ref="container" class="model"></div>
      </div>
    </div>
    <div class="rightLogin h-full flex flex-1 items-center">
      <div class="box m-auto">
        <el-form
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
        >
          <el-form-item label="账号">
            <el-input v-model="formLabelAlign.name" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" typ>
            <el-input v-model="formLabelAlign.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-Button plain @click="submit">登录</el-Button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="absolute left-0 bottom-0">
      <el-radio-group v-model="curModelIndex">
        <el-radio-button label="1" />
        <el-radio-button label="2" />
        <el-radio-button label="3" />
        <el-radio-button label="4" />
        <el-radio-button label="5" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 从左到右的水平渐变 */
  background: linear-gradient(to right, #e5f8ff, #3131ff);
  // background-image: url(@/assets/image/login.jpg);
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  .model {
    // background-image: url('@/assets/image/model-bg5.jpg');
    // background-size: cover;
    // background-repeat: no-repeat;
    filter: saturate(3);
    background: transparent;
    @apply mx-auto my-0 w-460px h-392px cursor-pointer;
  }
  .box {
    width: 300px;
    height: 250px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: var(--el-bg-color);
    opacity: 1;
    box-shadow: 10px 10px 20px rgb(0 0 0 / 59%);
    :deep(.el-button) {
      width: 100%;
    }
  }
  .rightLogin {
    // background-color: #0035ff73;
  }
}
</style>
