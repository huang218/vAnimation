<script setup lang="ts">
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { useModel } from './hooks/useModel'
import { reactive } from 'vue'

const { container, curModelIndex } = useModel()
const { replaceRouter } = useRouterJump()
const { getUserInfo } = userStore()
// const container = ref(null)

const formLabelAlign = reactive({
  name: '',
  password: ''
})

async function submit() {
  const datas = await getUserInfo()
  if (datas) {
    replaceRouter('/')
  }
}
</script>
<template>
  <div class="login-box">
    <div class="flex-1 relative">
      <div ref="container" class="model"></div>
    </div>
    <div class="rightLogin flex-1">
      <div class="poistion">
        <el-radio-group v-model="curModelIndex">
          <el-radio-button label="1" />
          <el-radio-button label="2" />
          <el-radio-button label="3" />
          <el-radio-button label="4" />
          <el-radio-button label="5" />
        </el-radio-group>
      </div>
      <div class="box m-auto">
        <!-- <div class="text-center text-20px">Vue</div> -->
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
  </div>
</template>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(@/assets/image/login.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .model {
    // background-image: url('@/assets/image/model-bg5.jpg');
    // background-size: cover;
    // background-repeat: no-repeat;
    filter: saturate(3);
    @apply mx-auto my-0 w-460px h-392px cursor-pointer;
  }
  .box {
    width: 300px;
    height: 250px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: var(--el-bg-color);
    opacity: 0.8;
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
