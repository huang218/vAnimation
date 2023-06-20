<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useLoading } from '@/hooks/useLoading'
import { MyReadonly, MyRecord } from '@/types'

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

const obj = ref<user7>({
  name: '214',
  age: 1,
  home: '1'
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

const { setLoading } = useLoading()
const mockRquest = (): void => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 2000)
}
</script>
<template>
  <div>
    <el-button plain @click="mockRquest">加载loading</el-button>
  </div>
</template>
<style lang="less" scoped></style>
