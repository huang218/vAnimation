<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Moon, Sunny, SwitchButton } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { Local } from '@/utils'
import { formatAxis } from '@/utils/formatTime'
import leftHeader from './leftHeader.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const userStores = userStore()
const { replaceRouter } = useRouterJump()
const dialogVisible = ref(false)
const switchType = ref(false)

const logOut = () => {
  userStores.logOut()
  dialogVisible.value = false
  replaceRouter('/login')
}
const switchClick = async (newVal: boolean) => {
  switchType.value = newVal
  setTimeout(() => {
    toggleDark(!newVal)
  }, 200)
}
const initSitch = (): void => {
  const darkType = Local.getNoJson('vueuse-color-scheme')
  switchType.value = darkType === ('light' || 'dark')
}

onMounted(() => {
  initSitch()
  console.log(formatAxis(new Date()), '问候语')
})
</script>
<template>
  <div class="header-box">
    <el-header class="flex-box">
      <div class="left h-full flex-1">
        <leftHeader />
      </div>
      <div class="right flex justify-end h-full w-50 items-center">
        <a href="#">测试</a>
        <div>{{ formatAxis(new Date()) }}</div>
        <el-switch
          v-model="switchType"
          :inline-prompt="true"
          :active-icon="Sunny"
          :inactive-icon="Moon"
          :size="'large'"
          @change="switchClick"
        />
        <el-icon :size="'large'">
          <component :is="SwitchButton" class="logOutIcon" @click="dialogVisible = true" />
        </el-icon>
      </div>
    </el-header>
  </div>
  <el-dialog v-model="dialogVisible" title="是否退出登陆" width="30%">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logOut()"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="less" scoped>
.header-box {
  width: 100%;
  height: 60px;
  border-bottom: solid 1px var(--el-menu-border-color);
  .right {
    :deep(.el-switch__inner, .el-switch__action) {
      .is-icon {
        font-size: 16px;
      }
    }
    .logOutIcon {
      cursor: pointer;
      color: var(--el-text-color-primary);
      font-size: 20px;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .right > * {
    margin-left: 10px;
  }
  .flex-box {
    padding-left: 0;
    @apply flex justify-between items-center;
  }
}
</style>
