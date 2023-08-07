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

  const isOne = ref(true)
  const mouseInfo = ref<any>()
  const cube = shallowRef<THREE.Mesh>()
  const cloneCuBe = shallowRef<any>()

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
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
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
    // loadAnimate(object, animations, animations[0]?.name)

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
    // nextTick(() => {
    //   xueRenAnimation()
    // })
    // cube.value?.rotation.set(0, 0, 0)
    const { x, y, z } = cloneCuBe.value
    animation({
      from: cube.value?.rotation,
      to: { x, y, z },
      duration: 100,
      onUpdate: (position: any) => {
        cube.value?.rotation.set(position.x, position.y, position.z)
      }
    })
    isOne.value = true
  }

  const onStop = () => {
    console.log(camera.value.position, '暂停记录位置')
    tweenPosition.value = camera.value.position
  }

  const stopAnimation = (e: Event) => {
    tween.value?.stop()
  }
  // 限制最大值最小值
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
  }
  const setX = (position) => {
    if (isOne.value) {
      // 第一次进入记录位置信息
      mouseInfo.value = position
      isOne.value = false
      return
    }

    console.log(position, 'position')
    cube.value.rotation.x += clamp(position.x, -0.003, 0.003)
    cube.value.rotation.y += clamp(position.y, -0.003, 0.003)
    // const posX =
    //   position.x > mouseInfo.value.x
    //     ? cube.value?.rotation.x + 0.002
    //     : cube.value?.rotation.x - 0.002
    // const posY =
    //   position.y > mouseInfo.value.y
    //     ? cube.value?.rotation.y + 0.003
    //     : cube.value?.rotation.y - 0.003
    // console.log(posX, posY)

    // const isX = posX > 0 ? posX > 0.2 : posX * -1 > 0.2
    // const isY = posY > 0 ? posY > 0.3 : posY * -1 > 0.3
    // mouseInfo.value = position
    // // console.log(isX, '位置信息', posX, posY)
    // if (!isX) {
    //   cube.value.rotation.x = posX
    // }
    // if (!isY) {
    //   cube.value.rotation.y = posY
    // }
  }

  // 加载几何体
  const loadGeometry = async () => {
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      fog: true,
      wireframe: true,
      wireframeLinewidth: 70
    })
    const mesh = new THREE.Mesh(geometry.value, material)
    mesh.scale.set(1, 1, 1)
    mesh.position.set(0, 50, 0)
    mesh.rotation.set(0, 20, 0)
    mesh.castShadow = true // 对象是否渲染到阴影贴图中，默认值为false
    mesh.receiveShadow = true
    cube.value = mesh
    group.add(mesh)
  }

  // 创建辅助坐标轴
  const setCoordinate = () => {
    //参数200标示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(1000)
    group.add(axesHelper)
  }

  const logweizhi = () => {
    console.log(camera.value, '摄像机位置', cube.value)
    // control.value?.update()
  }

  onMounted(async () => {
    loading.value = true
    camera.value?.position.set(0, 50, 486) // 摄像机初始位置
    scene.value?.add(group) // 场景中加载组
    control.value?.target.set(0, 65, 0)
    control.value?.update()
    loadLights() // 加载平行光
    setCoordinate() // 坐标系
    await loadModels([loadGeometry()])
    loading.value = false
    render() // 渲染
    console.log(camera.value, 'camera.value', control.value)
    cloneCuBe.value = cube.value.rotation.clone()
    // xueRenAnimation() // 雪人动画开启

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
    setX,
    logweizhi
  }
}
