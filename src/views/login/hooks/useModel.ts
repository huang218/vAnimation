import * as THREE from 'three'
import type { Tween } from '@tweenjs/tween.js'
import useThree from '@/hooks/useThree/index'
import { onMounted, ref, onUnmounted, reactive, watch, nextTick } from 'vue'
import { forEach } from 'lodash'
import { animation, maxRotation, scopeHandle } from '@/utils'

const TENCENT_MODEL_SCALES = <const>[1 * 4, 1 * 4, 1 * 4]
const TEST_MODEL_SCALES = <const>[1 * 40, 1 * 40, 1 * 40]
const MODEL_URL = <const>{
  MODEL1: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_BASE_URL}models/box1.glb`,
  MODEL2: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_BASE_URL}models/box2.glb`,
  MODEL3: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_BASE_URL}models/box3.glb`,
  MODEL4: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_BASE_URL}models/box4.glb`,
  MODEL5: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_BASE_URL}models/box5.glb`
}

export function useModel() {
  const {
    container,
    scene,
    camera,
    control,
    renderMixins,
    loading,
    loadGLTF,
    loadModels,
    render,
    loadAnimate,
    openLoading,
    closeLoading,
    renderer
  } = useThree()

  const curModelIndex = ref(1)
  const rate = 0.01 // 旋转频率
  // 360 / ? = result*2
  const maxRotations = maxRotation(15) // 最大旋转角度限制 Math.PI表示π 分成12份，每份就是360 / 12 = 30度，最大旋转角度15度
  const defaultAngleX = maxRotation(0) // 初始化x轴旋转角度
  const isMouseOver = ref(false) // 鼠标是否在容器区域内
  const rotationX = ref(0) // 当前旋转角度 X 轴
  const rotationY = ref(0) // 当前旋转角度 Y 轴
  const mouseX = ref(0) // 鼠标相对于容器的 X 坐标
  const mouseY = ref(0) // 鼠标相对于容器的 Y 坐标
  const group = new THREE.Group() // 创建组
  const modelRef = ref<THREE.Object3D>()
  const tweenAnimation = ref<Tween<Record<string, any>>>()
  // 目标旋转角度
  const targetRotation = reactive({
    x: defaultAngleX,
    y: -maxRotations
  })

  watch(
    () => curModelIndex.value,
    async () => {
      openLoading()
      closeEvent()
      delModel()
      await nextTick()
      loadModel()
      closeLoading()
      openEvent()
    }
  )

  // 加载灯光-平行光
  const loadLights = () => {
    const LIGHT_LIST = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100]
    ]
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(x, y, z)
      scene.value?.add(directionalLight)
    })
    const light = new THREE.AmbientLightProbe() // 柔和的白光
    scene.value?.add(light)
  }

  // 加载模型
  const loadModel = async () => {
    const { scene: object, animations } = await loadGLTF(MODEL_URL[`MODEL${curModelIndex.value}`])
    object.position.set(0, 0, 0)
    object.rotation.set(0, 0, 0)
    object.scale.set(...TENCENT_MODEL_SCALES)
    if (animations.length) {
      forEach(animations, (child) => {
        loadAnimate(object, animations, child?.name)
      })
    }
    console.log(object, 'model')
    object.name = 'Tencent'
    // const newModel = await modelMaterial(object)
    modelRef.value = object
    scene.value?.add(object)
  }

  // 删除模型
  const delModel = async () => {
    modelRef.value?.traverse(function (child) {
      scene.value?.remove(child)
      // child.visible = false // 隐藏模型
    })
    modelRef.value = null
    scene.value?.traverse(function (child) {
      if (child instanceof THREE.Group) {
        // 释放网格的资源
        scene.value?.remove(child)
      }
    })
  }

  // const modelMaterial = async (model: THREE.Object3D) => {
  //   // 加载纹理图像
  //   const textureLoader = new THREE.TextureLoader()
  //   const texture = textureLoader.load(`src/assets/image/blue.png`)

  //   // 设置纹理的重复次数
  //   texture.repeat.set(2, 2)

  //   // 设置纹理的包裹模式为平铺
  //   texture.wrapS = THREE.RepeatWrapping
  //   texture.wrapT = THREE.RepeatWrapping
  //   // 应用纹理贴图
  //   model?.traverse(function (child) {
  //     if (child instanceof THREE.Mesh) {
  //       console.log(child, ' child')
  //       const material = new THREE.MeshPhongMaterial({ map: texture, color: 0xb39836 })
  //       child.material = material
  //     }
  //   })
  //   return model
  // }

  // 模型动画
  const modelAnimation = async () => {
    tweenAnimation.value = animation({
      from: targetRotation,
      to: { y: maxRotations },
      duration: 6 * 1000,
      onUpdate: (position: any) => {
        targetRotation.y = position.y
      },
      onComplete: () => {
        tweenAnimation.value = null
      }
    })
    tweenAnimation.value.yoyo(true).repeat(Infinity)
  }

  // 创建辅助坐标轴
  const setCoordinate = () => {
    //参数200标示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(200)
    group.add(axesHelper)
  }

  // 混入render
  const mixinRender = () => {
    // 平滑过渡旋转角度  旋转角度 - 上一步的角度 = 需要转动的角度 * 0.05(加过渡)
    rotationX.value += (targetRotation.x - rotationX.value) * 0.05
    rotationY.value += (targetRotation.y - rotationY.value) * 0.05

    if (modelRef.value) {
      // 角度值赋值给组
      modelRef.value.rotation.x = rotationX.value
      modelRef.value.rotation.y = rotationY.value
    }
  }

  // 鼠标移动事件处理函数
  const onMouseMove = (event) => {
    // 获取鼠标相对于容器的位置
    const newMouseX = event.clientX - container.value.offsetLeft
    const newMouseY = event.clientY - container.value.offsetTop

    // 计算鼠标移动距离 当前这步 - 上一步
    const deltaX = newMouseX - mouseX.value
    const deltaY = newMouseY - mouseY.value

    // 更新上一步鼠标位置
    mouseX.value = newMouseX
    mouseY.value = newMouseY

    // 当鼠标在容器区域内时，控制模型旋转
    if (isMouseOver.value) {
      // 计算x轴和y轴偏移的角度 通常为 +0.01 or -0.01 正值则向右下方向走， 负值向左上
      targetRotation.x += deltaY * rate
      targetRotation.y += deltaX * rate
      // console.log(targetRotationX, targetRotationY, '偏移角度', maxRotations)

      // 处理targetRotation，限制目标旋转角度在 ±15 度以内
      targetRotation.x = scopeHandle(targetRotation.x, -maxRotations, maxRotations)
      targetRotation.y = scopeHandle(targetRotation.y, -maxRotations, maxRotations)
    }
  }

  // 鼠标进入容器区域事件处理函数
  const onMouseEnter = () => {
    isMouseOver.value = true
    tweenAnimation.value.stop()
  }

  // 鼠标离开容器区域事件处理函数
  const onMouseLeave = () => {
    isMouseOver.value = false
    tweenAnimation.value.start()
    // 恢复模型位置
    targetRotation.x = defaultAngleX
    targetRotation.y = -maxRotations
  }
  // 监听鼠标移动事件
  const openEvent = () => {
    container.value?.addEventListener('mousemove', onMouseMove)
    container.value?.addEventListener('mouseenter', onMouseEnter)
    container.value?.addEventListener('mouseleave', onMouseLeave)
  }

  // 关闭鼠标移动事件
  const closeEvent = () => {
    container.value?.removeEventListener('mousemove', onMouseMove)
    container.value?.removeEventListener('mouseenter', onMouseEnter)
    container.value?.removeEventListener('mouseleave', onMouseLeave)
  }

  onMounted(async () => {
    camera.value?.position.set(0, 0, 486) // 摄像机初始位置
    scene.value?.add(group) // 场景中加载组
    control.value?.target.set(0, 0, 0)
    control.value?.update()

    renderMixins.set('render', mixinRender)
    false && setCoordinate() // 坐标系
    loadLights() // 加载平行光
    await loadModels([loadModel()]) // 加载模型
    render() // 渲染
    modelAnimation() // 模型旋转动画

    control.value.enableRotate = false //禁止旋转
    control.value.enablePan = false //禁止平移
    control.value.enableZoom = false //禁止缩放
    openEvent()
    console.warn('加载完成')

    // renderer.value?.setClearColor('#ffffff', 0)
    // renderer.value.shadowMap.enabled = true // 启动阴影
    // renderer.value.shadowMap.type = THREE.PCFSoftShadowMap
  })
  onUnmounted(() => {
    closeEvent()
    console.warn('关闭')
  })
  return {
    container,
    curModelIndex,
    loading,
    group,
    delModel,
    closeEvent
  }
}
