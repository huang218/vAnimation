<script setup lang="ts">
import { reactive } from 'vue'
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'

const formLabelAlign = reactive({
  name: '',
  password: ''
})
const { replaceRouter } = useRouterJump()
const { getUserInfo } = userStore()

async function submit() {
  const datas = await getUserInfo()
  if (datas) replaceRouter('/')
}
</script>
<template>
  <div class="login-box">
    <div class="box">
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
  .box {
    width: 300px;
    height: 250px;
    padding: 20px;
    border-radius: 20px;
    background-color: var(--el-bg-color);
    opacity: 0.8;
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
