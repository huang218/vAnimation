<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { maxRotation } from '@/utils'

let scene, renderer, camera, cube
let isMouseOver = false // 鼠标是否在容器区域内
let rotationX = 0 // 当前旋转角度 X 轴
let rotationY = 0 // 当前旋转角度 Y 轴
let targetRotationX = 0 // 目标旋转角度 X 轴
let targetRotationY = 0 // 目标旋转角度 Y 轴
let mouseX = 0 // 鼠标相对于容器的 X 坐标
let mouseY = 0 // 鼠标相对于容器的 Y 坐标
// Math.PI = 360 / ? = result*2
const maxRotations = maxRotation(12) // 最大旋转角度限制 Math.PI表示π 分成12份，每份就是360 / 12 = 30度，最大旋转角度15度
const rate = 0.01 // 旋转频率

const { replaceRouter } = useRouterJump()
const { getUserInfo } = userStore()
const container = ref(null)

const formLabelAlign = reactive({
  name: '',
  password: ''
})

async function submit() {
  const datas = await getUserInfo()
  if (datas) replaceRouter('/')
}

/**
 * 限制value在min ～ max之间
 * @param value 值
 * @param min 最小值
 * @param max 最大值
 */
const scopeHandle = (value: number, min: number, max: number) => {
  return Math.max(Math.min(max, value), min)
}

// 鼠标移动事件处理函数
const onMouseMove = (event) => {
  // 获取鼠标相对于容器的位置
  const newMouseX = event.clientX - container.value.offsetLeft
  const newMouseY = event.clientY - container.value.offsetTop

  // 计算鼠标移动距离 当前这步 - 上一步
  const deltaX = newMouseX - mouseX
  const deltaY = newMouseY - mouseY

  // 更新上一步鼠标位置
  mouseX = newMouseX
  mouseY = newMouseY
  console.log(deltaX, deltaY, '偏移角度')

  // 当鼠标在容器区域内时，控制模型旋转
  if (isMouseOver) {
    // 计算x轴和y轴偏移的角度 通常为 +0.01 or -0.01 正值则向右下方向走， 负值向左上
    targetRotationX += deltaY * rate
    targetRotationY += deltaX * rate

    // 处理targetRotation，限制目标旋转角度在 ±15 度以内
    targetRotationX = scopeHandle(targetRotationX, -maxRotations, maxRotations)
    targetRotationY = scopeHandle(targetRotationY, -maxRotations, maxRotations)
    console.log(targetRotationX, targetRotationY)
  }
}

// 动画循环函数-递归
const animate = () => {
  requestAnimationFrame(animate)
  // 平滑过渡旋转角度  旋转角度 - 上一步的角度 = 需要转动的角度 * 0.05(加过渡)
  rotationX += (targetRotationX - rotationX) * 0.05
  rotationY += (targetRotationY - rotationY) * 0.05

  // 角度值赋值给几何体
  cube.rotation.x = rotationX
  cube.rotation.y = rotationY

  renderer.render(scene, camera)
}

// 鼠标进入容器区域事件处理函数
const onMouseEnter = () => {
  isMouseOver = true
}
// 鼠标离开容器区域事件处理函数
const onMouseLeave = () => {
  isMouseOver = false
  // 恢复鼠标进入前的旋转状态
  targetRotationX = rotationX
  targetRotationY = rotationY
}

onMounted(() => {
  // 在组件挂载时创建场景
  scene = new THREE.Scene()

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  container.value.appendChild(renderer.domElement)

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    25,
    container.value.offsetWidth / container.value.offsetHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // 创建几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    fog: true,
    wireframe: true,
    wireframeLinewidth: 70
  })
  cube = new THREE.Mesh(geometry, material)

  const control = new OrbitControls(camera, renderer.domElement) // 轨道控制器 保持模型为中心
  control.target = new THREE.Vector3(0, 0, 0)

  control.enableRotate = false //禁止旋转
  control.enablePan = false //禁止平移
  control.enableZoom = false //禁止缩放
  control.update()

  // 创建坐标系
  const axesHelper = new THREE.AxesHelper(1000)
  // 将坐标系添加到场景中
  false && scene.add(axesHelper)
  // 将几何体添加到场景中
  scene.add(cube)

  // 监听鼠标移动事件
  container.value.addEventListener('mousemove', onMouseMove)

  // 渲染场景
  animate()
})

onUnmounted(() => {
  // 在组件卸载时清理事件监听器
  container.value.removeEventListener('mousemove', onMouseMove)
})
</script>
<template>
  <div class="login-box">
    <div class="flex-1 relative">
      <div
        ref="container"
        class="mx-auto my-0 w-400px h-400px cursor-pointer border-1"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      ></div>
    </div>
    <div class="rightLogin flex-1">
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
