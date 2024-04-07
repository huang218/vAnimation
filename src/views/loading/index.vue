<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import { useLoading } from '@/hooks/useLoading'
import { throttle, debounce } from '@/utils'
import { MyReadonly, MyRecord, AssignPartial, MyPartialOption, FunctionKeys } from '@/types'

const sess = useSessionStorage('session', { age: 18 })
const initSess = () => {
  sess.value.age++
  console.log('更新后的sess', sess.value.age)
}
// 将user1中可选属性变为必选
interface user1 {
  name?: string
  age: number
  home: string
  // fn(text: string, ...agr: string[]): void
}
interface type2 {
  hjh: string
  ages: number
  home?: string
}
type type343 = {
  name: string
  age: undefined
  home: null
  fn: () => any
  callback: (...args: any[]) => void
}
type riQi728 = MyPartialOption<type2, 'ages' | 'hjh' | 'home'>
const test728 = ref<riQi728>({})
const FunctionKeysTest = ref<FunctionKeys<type343>>('age')
type obj1 = Record<number, { name?: string }>
type user = Partial<user1> // user1中属性变为可选
type user2 = Required<user1> // 将user1可选属性变为必填
type user3 = Pick<user1, 'age' | 'home'> // 从user1中拿到age属性生成新的类型
type user4 = Omit<user1, 'age'> // 从user1中删除age属性 生成新的类型
type user5 = Record<string, { name: string }>
type user51 = MyRecord<string, { name: string }>
type user6 = Exclude<keyof type2, 'hjh'>
type user7 = Readonly<user1>
type user8 = MyReadonly<user1>
type NonNullable<T> = T extends null | undefined ? never : T
type ThreeStringProps = Record<keyof user1, string>
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never
type isOne<T extends number> = T extends 1 ? true : false
const isone = ref<isOne<1>>(true)
const obj = ref<user51>({
  name: { name: 'ss' }
})
type aa = NonNullable<1 | 2 | null>
/**
 * 任意类型泛型函数
 */
const anyFun = <T extends any>(num: T): T => {
  return num
}
anyFun('2')
// ----------------------------------------------------

/**
 * LenType接口 约束T类型必须含有length属性-------------
 */
interface LenType {
  length: number
}
const logginIdentity = <T extends LenType>(num: T): T => {
  console.log(num.length)
  return num
}
logginIdentity([1, 2, 3]) // logginIdentity(2) => error
// ----------------------------------------------------

/**
 * 泛型中约束类型参数
 * 获取obj[key]的值
 */
const getValueBykey = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}
let ob = { name: 'hjh', age: 18 }
// getValueBykey(ob, 'name2') ==> error
getValueBykey(ob, 'name')
// ----------------------------------------------------

// infer 练习------------------------------------------
type infer1 = string[]
type UnpackdArray<T> = T extends (infer U)[] ? U : T
type U0 = UnpackdArray<infer1>

declare function fn1(num: string, x: boolean): number
type GetFnReturn<T> = T extends (...args: any[]) => infer U ? U : T // 获取函数返回值类型
type GetFnValue<T> = T extends (...args: (infer U)[]) => any ? U : T // 获取函数形参类型
type TestFn1 = GetFnReturn<typeof fn1>
type TestFn2 = GetFnValue<typeof fn1>

type Obj = {
  name: string
  age: number
  home: string
  isShow: boolean
}
type GetObjType<T> = T extends { name: infer A; age: infer B; home: infer C; isShow: infer D }
  ? [A, B, C, D]
  : T // 获取对象属性类型
type Obj1 = GetObjType<Obj>

type MyType = AssignPartial<Obj, 'age' | 'isShow'>
const obj123 = reactive<MyType>({
  name: '123',
  home: '123'
})

const { setLoading } = useLoading()
const mockRquest = (): void => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 2000)
}
const aaa = throttle((...e) => {
  console.log(typeof e, 'throttle', ...e)
}, 2000)
const bbb = debounce((...e) => {
  console.log(typeof e, 'debounce', ...e)
}, 2000)
</script>
<template>
  <div class="h-full w-full">
    <el-button plain @click="mockRquest">加载loading</el-button>
    <el-button plain @click="initSess">更改sessionStorage</el-button>
    <el-button plain @click="aaa('hjh', true, '13', 22)">节流</el-button>
    <el-button plain @click="bbb('hjh')">防抖</el-button>
    <br />
    <a href="#">文字下划线动画</a>
  </div>
</template>
<style lang="less" scoped></style>
