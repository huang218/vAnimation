<script setup lang="ts">
import { userStore } from '@/stores'
import { useRouterJump } from '@/hooks/useRouterJump'
import { reactive, ref, toRef, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { useModel } from './hooks/useModel'
import { throttle } from '@/utils'
import { MouseType } from '@/types'

const { container, loading, stopAnimation, xueRenReset, setX } = useModel()
const { elementX, elementY, isOutside } = useMouseInElement(container)

const formLabelAlign = reactive({
  name: '',
  password: ''
})
const mouse = reactive<Record<MouseType, number>>({
  elementX: 0,
  elementY: 0
})
const xrPosition = ref({
  x: 0,
  y: 0
})
const { replaceRouter } = useRouterJump()
const { getUserInfo } = userStore()

async function submit() {
  const datas = await getUserInfo()
  if (datas) replaceRouter('/')
}

watch(loading, (val) => {
  console.log(val)
})
watch(
  [elementX, elementY, isOutside],
  throttle((val) => {
    const [elementX, elementY, isOutside] = val

    if (!isOutside) {
      // 当前 -- 上一次
      let a, b
      if (mouse.elementX > elementX) {
        a = 1
      } else {
        a = -1
      }
      if (mouse.elementY > elementY) {
        b = 1
      } else {
        b = -1
      }
      mouse.elementX = elementX
      mouse.elementY = elementY
      console.log(a, '423', b)

      // console.log(xrPosition.value.x / 10, 'xrPosition.value', xrPosition.value.y / 10)

      // setX({ x: a, y: b })
    }
  }, 100)
)

const reset = () => {
  xrPosition.value = {
    x: 0,
    y: 0
  }
  xueRenReset()
}

// const init = () => {
//   // scene
//   const scene = new THREE.Scene()
//   //scene添加背景颜色
//   // scene.background = new THREE.Color(0x000000)
//   //创建一个物体（形状）
//   const geometry = new THREE.BoxGeometry(100, 100, 100) //长宽高都是100的立方体
//   // const geometry = new THREE.SphereGeometry(60,40,40);//半径是60的圆
//   //widthSegments, heightSegments：水平方向和垂直方向上分段数。widthSegments最小值为3，默认值为8。heightSegments最小值为2，默认值为6。
//   //创建材质（外观）
//   const material = new THREE.MeshLambertMaterial({
//     color: 0x0000ff //设置材质颜色(蓝色)
//     // color: 0x00ff00,//(绿色)
//     // transparent: true, //开启透明度
//     // opacity: 0.5 //设置透明度
//   })
//   //创建一个网格模型对象
//   const mesh = new THREE.Mesh(geometry, material) //网络模型对象Mesh
//   //把网格模型添加到三维场景
//   scene.add(mesh) //网络模型添加到场景中

//   // 添加多个模型（添加圆形）
//   // const geometry2 = new THREE.SphereGeometry(60, 40, 40)
//   // const material2 = new THREE.MeshLambertMaterial({
//   //   color: 0xffff00
//   // })
//   // const mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
//   // // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
//   // mesh2.position.set(120, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
//   // scene.add(mesh2)

//   //添加光源 //会照亮场景里的全部物体（氛围灯），前提是物体是可以接受灯光的，这种灯是无方向的，即不会有阴影。
//   const ambient = new THREE.AmbientLight(0xffffff, 0.8)
//   scene.add(ambient)

//   const light = new THREE.PointLight(0xffffff, 1) //点光源，color:灯光颜色，intensity:光照强度
//   light.position.set(200, 300, 400)
//   scene.add(light)

//   console.log(model, 'model')
//   //创建一个透视相机，窗口宽度，窗口高度
//   const width = model.value.offsetWidth,
//     height = model.value.offsetHeight
//   const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
//   //设置相机位置
//   camera.position.set(300, 300, 300)
//   //设置相机方向
//   camera.lookAt(0, 0, 0)

//   //创建辅助坐标轴
//   const axesHelper = new THREE.AxesHelper(200) //参数200标示坐标系大小，可以根据场景大小去设置
//   scene.add(axesHelper)

//   //创建一个WebGL渲染器
//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
//   renderer.setClearAlpha(0)
//   renderer.setSize(width, height) //设置渲染区尺寸
//   renderer.render(scene, camera) //执行渲染操作、指定场景、相机作为参数

//   const controls = new OrbitControls(camera, renderer.domElement) //创建控件对象
//   controls.addEventListener('change', () => {
//     renderer.render(scene, camera) //监听鼠标，键盘事件
//   })
//   model.value.appendChild(renderer.domElement)
// }

// onMounted(() => {
//   init()
// })
</script>
<template>
  <div class="login-box">
    <div class="flex-1 relative">
      <div
        ref="container"
        class="mx-auto my-0 w-400px h-300px cursor-pointer"
        @mouseenter="stopAnimation"
        @mouseleave="reset"
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
            <!-- <el-button plain @click="xueRenReset">复位</el-button> -->
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
