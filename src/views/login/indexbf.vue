<template>
  <div ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, renderer, camera, cube

onMounted(() => {
  // 在组件挂载时创建场景
  scene = new THREE.Scene()

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // 创建相机
  camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // 创建几何体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    fog: true,
    wireframe: true,
    wireframeLinewidth: 70
  })
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

  // 将鼠标位置映射到旋转角度
  const rotationX = (mouseY / window.innerHeight) * 2 - 1
  const rotationY = (mouseX / window.innerWidth) * 2 - 1

  // 控制几何体旋转
  cube.rotation.x = rotationX * 0.2
  cube.rotation.y = rotationY * 0.2
}

// 动画循环函数
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
</script>
