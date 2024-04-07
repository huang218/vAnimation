<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Moon, Sunny, SwitchButton } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { Local } from '@/utils'
import { formatAxis } from '@/utils/formatTime'
import leftHeader from './leftHeader.vue'

const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const userStores = userStore()
const { replaceRouter } = useRouterJump()
const dialogVisible = ref(false)
const switchType = ref(false)

const logOut = () => {
  router.push({ path: '/login' })
  dialogVisible.value = false
  userStores.logOut()
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
const change = (type: boolean) => {
  console.log(type, '按钮状态')
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
      <div class="right flex justify-end h-full w-100 items-center">
        <t-button class="transform w-40px h-40px scale-80" @change="change" />
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
        <el-icon :size="24">
          <component :is="SwitchButton" class="logOutIcon" @click="dialogVisible = true" />
        </el-icon>
      </div>
    </el-header>
    <el-dialog v-model="dialogVisible" title="是否退出登陆" width="30%">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="logOut()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
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
      font-size: 24px;
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
