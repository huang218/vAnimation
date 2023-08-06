import * as THREE from 'three'
import useThree from '@/hooks/useThree/index'
import { onMounted, nextTick, ref, shallowRef } from 'vue'
import { forEach, size } from 'lodash'
import { v4 as uuid } from 'uuid'
import { animation } from '@/utils'

const MODEL_SCALES = <const>[1 * 100, 1 * 100, 1 * 100]
const MODEL_URL = <const>{
  LOWPOLY: `${import.meta.env.VITE_API_DOMAIN}/models/lowpoly.glb`
}

export function useModel() {
  const loading = ref(false)
  const tween = ref<any>() // 雪人模型动画对象
  const tweenPosition = ref<any>()
  const group = new THREE.Group() // 创建组
  const modelLow = shallowRef<THREE.Object3D>()

  const {
    geometry,
    container,
    scene,
    camera,
    control,
    renderMixins,
    loadGLTF,
    loadModels,
    loadAnimate,
    render
  } = useThree()

  // 加载灯光-平行光
  const loadLights = () => {
    const LIGHT_LIST = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100]
    ]
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      directionalLight.position.set(x, y, z)
      scene.value?.add(directionalLight)
    })
  }

  // 加载雪人模型
  const loadModelXueRen = async () => {
    const { scene: object, animations } = await loadGLTF(MODEL_URL.LOWPOLY)
    console.log(object, 'object')
    // mesh.position.set(120, 0, 0)
    // object.rotation.y = 0.5
    object.scale.set(...MODEL_SCALES)
    object.position.set(0, 0, 0)
    loadAnimate(object, animations, animations[0]?.name)

    object.name = 'lowpoly'
    modelLow.value = object
    group.add(object)
  }

  // 雪人动画
  const xueRenAnimation = async () => {
    modelLow.value?.children.forEach((child: THREE.Object3D) => {
      console.log(child, '模型')
      tween.value = animation({
        from: child.rotation,
        to: { y: 1 },
        duration: 6 * 1000,
        onUpdate: (position: any) => {
          child.rotation.y = position.y
        },
        onComplete: () => {
          tween.value = null
          xueRenAnimation2()
        },
        onStop
      })
    })
  }

  // 雪人回来动画
  const xueRenAnimation2 = async () => {
    modelLow.value?.children.forEach((child: THREE.Object3D) => {
      tween.value = animation({
        from: child.rotation,
        to: { y: 0 },
        duration: 6 * 1000,
        onUpdate: (position: any) => {
          child.rotation.y = position.y
        },
        onComplete: () => {
          tween.value = null
          xueRenAnimation()
        },
        onStop
      })
    })
  }
  // 重置雪人旋转角度
  const xueRenReset = () => {
    // modelLow.value?.children.forEach((child: THREE.Object3D) => {
    //   animation({
    //     from: child.rotation,
    //     to: { x: 0, y: 0, z: 0 },
    //     duration: 300,
    //     onUpdate: (position: any) => {
    //       child.rotation.set(position.x, position.y, position.z)
    //     }
    //   })
    // })
    nextTick(() => {
      xueRenAnimation()
    })
  }

  const onStop = () => {
    console.log(camera.value.position, '暂停记录位置')
    tweenPosition.value = camera.value.position
  }

  const stopAnimation = (e: Event) => {
    tween.value?.stop()
  }

  const setX = (position) => {
    const { x, y } = position

    modelLow.value.children[0].rotation.x =
      x > 0
        ? (modelLow.value.children[0].rotation.x += 0.03)
        : (modelLow.value.children[0].rotation.x -= 0.03)
    modelLow.value.children[0].rotation.y =
      y > 0
        ? (modelLow.value.children[0].rotation.y += 0.03)
        : (modelLow.value.children[0].rotation.y -= 0.03)
    control.value?.update()

    console.log(((control.value.getAzimuthalAngle() * 180) / Math.PI).toFixed(2), '水平')
    console.log(((control.value.getPolarAngle() * 180) / Math.PI).toFixed(2), '垂直')
  }

  // 加载几何体
  const loadGeometry = async () => {
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const mesh = new THREE.Mesh(geometry.value, material)
    mesh.scale.set(1, 1, 1)
    mesh.position.set(120, 0, 0)
    group.add(mesh)
  }

  // 创建辅助坐标轴
  const setCoordinate = () => {
    //参数200标示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(1000)
    group.add(axesHelper)
  }

  onMounted(async () => {
    loading.value = true
    scene.value?.add(group) // 场景中加载组
    camera.value?.position.set(0, 50, 400) // 摄像机初始位置
    control.value?.target.set(0, 65, 0)
    control.value?.update()
    loadLights() // 加载平行光
    // setCoordinate() // 坐标系
    await loadModels([loadModelXueRen()])
    loading.value = false
    render() // 渲染
    console.log(camera.value, 'camera.value', control.value)
    xueRenAnimation() // 雪人动画开启

    control.value.enableRotate = false //禁止旋转
    control.value.enablePan = false //禁止平移
    control.value.enableZoom = false //禁止缩放
    // 上下旋转范围
    // control.value.minPolarAngle = 0
    // control.value.maxPolarAngle = Math.PI
    // 左右旋转范围
    // control.value.minAzimuthAngle = -Math.PI * (15 / 180)
    // control.value.maxAzimuthAngle = Math.PI * (15 / 180)
  })

  return {
    container,
    loading,
    group,
    stopAnimation,
    xueRenReset,
    setX
  }
}
