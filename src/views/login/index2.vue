<template>
  <div ref="container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, renderer, camera, cube
let isMouseOver = false // 鼠标是否在容器区域内
let rotationX = 0 // 当前旋转角度 X 轴
let rotationY = 0 // 当前旋转角度 Y 轴

onMounted(() => {
  // 在组件挂载时创建场景
  scene = new THREE.Scene()

  // 创建渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // 创建几何体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)

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

// 鼠标移动事件处理函数
function onMouseMove(event) {
  // 获取鼠标相对于容器的位置
  const mouseX = event.clientX - container.value.offsetLeft
  const mouseY = event.clientY - container.value.offsetTop

  // 计算鼠标移动距离
  const deltaX = rotationX - (mouseY / window.innerHeight) * 2 - 1
  const deltaY = rotationY - (mouseX / window.innerWidth) * 2 - 1

  // 更新当前旋转角度
  rotationX = (mouseY / window.innerHeight) * 2 - 1
  rotationY = (mouseX / window.innerWidth) * 2 - 1

  // 当鼠标在容器区域内时，控制几何体旋转
  if (isMouseOver) {
    cube.rotation.x += deltaX * 0.01
    cube.rotation.y += deltaY * 0.01
  }
}

// 动画循环函数
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

// 鼠标进入容器区域事件处理函数
function onMouseEnter() {
  isMouseOver = true
}

// 鼠标离开容器区域事件处理函数
function onMouseLeave() {
  isMouseOver = false
}
</script>
