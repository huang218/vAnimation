import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as THREE from 'three'

class ThreeBase {
  // 场景
  static initScene() {
    const scene = new THREE.Scene()
    return scene
  }

  // 创建几何体
  static initGeometry() {
    const camera = new THREE.BoxGeometry(100, 100, 100)
    return camera
  }

  // 相机
  static initCamera(element: HTMLElement) {
    const fov = 20
    const near = 0.1
    const far = 2000
    const aspect = element.offsetWidth / element.offsetHeight
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 0)
    return camera
  }

  // CSS 2D渲染器
  static initCSSRender(element: HTMLElement) {
    const CSSRenderer = new CSS2DRenderer()
    CSSRenderer.setSize(element.offsetWidth, element.offsetHeight)
    CSSRenderer.domElement.style.position = 'absolute'
    CSSRenderer.domElement.style.top = '0px'
    element.appendChild(CSSRenderer.domElement)
    return CSSRenderer
  }

  // 渲染器
  static initRenderer(element: HTMLElement) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // renderer.setClearColor('#000')
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.setSize(element.offsetWidth, element.offsetHeight)
    renderer.localClippingEnabled = true
    element.appendChild(renderer.domElement)
    return renderer
  }

  // Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
  static initControl(camera: THREE.Camera, domElement: HTMLElement) {
    const control = new OrbitControls(camera, domElement) // 轨道控制器 保持模型为中心
    control.target = new THREE.Vector3(0, 0, 0)
    control.update()
    return control
  }
}

export default ThreeBase
