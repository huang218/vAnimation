import { isFunction } from 'lodash'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted, shallowRef, ref } from 'vue'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { useLoading } from '@/hooks/useLoadings'
import ThreeBase from './core'

function useThree() {
  const container = ref<HTMLElement>() // 放置节点
  const { loading, openLoading, closeLoading } = useLoading(true, 500)
  const scene = shallowRef<THREE.Scene>() // 场景
  const camera = shallowRef<THREE.Camera>() // 摄像机
  const renderer = shallowRef<THREE.WebGLRenderer>() // 渲染器
  const CSSRenderer = shallowRef<CSS2DRenderer>()
  const control = shallowRef<OrbitControls>() // 轨道控制器
  const geometry = shallowRef<THREE.BoxGeometry>() // 几何体

  const mixers: any = []
  const clock = new THREE.Clock()
  const composers = new Map()
  const renderMixins = new Map()

  onMounted(() => {
    const el = container.value as HTMLElement
    scene.value = ThreeBase.initScene() // 初始化场景
    camera.value = ThreeBase.initCamera(el) // 初始化相机
    renderer.value = ThreeBase.initRenderer(el) // 初始化渲染器
    CSSRenderer.value = ThreeBase.initCSSRender(el)
    geometry.value = ThreeBase.initGeometry()
    control.value = ThreeBase.initControl(
      // 控制相机移动
      camera.value,
      CSSRenderer.value.domElement
    )
  })

  // 更新渲染
  const render = () => {
    const delta = new THREE.Clock().getDelta()
    renderer.value!.render(scene.value!, camera.value!)
    const mixerUpdateDelta = clock.getDelta()
    mixers.forEach((mixer: any) => mixer.update(mixerUpdateDelta))
    composers.forEach((composer) => composer.render(delta))
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin())
    CSSRenderer.value!.render(scene.value!, camera.value!)
    TWEEN.update()

    requestAnimationFrame(() => render())
  }

  // 统一执行promise，初始化加载
  const loadModels = async (tasks: Promise<any>[]) => {
    openLoading()
    await Promise.all(tasks)
    closeLoading()
  }
  // 加载 glb/gltf 模型
  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader()
    const onCompleted = (object: GLTF, resolve: any) => resolve(object)
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve))
    })
  }

  // 播放模型自带动画
  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string
  ) => {
    const mixer = new THREE.AnimationMixer(mesh)
    const clip = THREE.AnimationClip.findByName(animations, animationName)
    if (!clip) return undefined
    const action = mixer.clipAction(clip)
    action.play()
    mixers.push(mixer)
    return undefined
  }
  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    render,
    loadGLTF,
    loadAnimate,
    loadModels
  }
}

export default useThree
