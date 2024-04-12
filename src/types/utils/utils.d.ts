/**
 * 个人练习
 */

/**
 * 递归遍历可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Object ? DeepPartial<T[P]> : T[P]
}

/**
 * 将属性变为可选
 */
export type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * 将部分属性变为可选，其他必填
 * 可选部分 & 其他部分
 */
export type MyPartialOption<T, K extends keyof T> = MyPartial<MyPick<T, K>> & MyOmit<T, K>

/**
 * 将属性变为必选
 */
export type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * 以U联合类型为准，查找T中相应的类型，生成新的类型
 */
export type MyPick<T, U extends keyof T> = {
  [P in U]: T[P]
}
/**
 * 从T联合类型中排除U类型 / 联合类型
 */
export type MyExclude<T, U> = T extends U ? never : T

/**
 * T || U === 联合类型
 * 提取T和U的交集类型
 */
export type MyExtract<T, U> = T extends U ? T : never

type Test = MyExtract<'a' | 'b' | 'c', 'a' | 'c'>

/**
 * 从T接口中排除K联合类型的属性
 * MyExclude<keyof T, K>: 从T中排除K 生成新的联合类型
 */
export type MyOmit<T, K extends any> = MyPick<T, MyExclude<keyof T, K>>
export type MyOmit2<T, K extends any> = {
  [P in MyExclude<keyof T, K>]: T[P]
}

type OmitTest = MyOmit<{ readonly name?: string; age: number }, 'age'>

/**
 * 过滤null 、undefined
 */
export type MyNonNullable<T> = T extends null | undefined ? never : T

/**
 * Record
 * keyof any === number | string | symbol
 */
export type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

/**
 * Readonly -? // ?
 */
export type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

/**
 * NonNullable 联合类型去除null、undefined
 */
export type MyNonNullabl<T> = T extends undefined ? never : T

/**
 * 根据U联合类型设置T中对应属性为可选 ------------左边是U以外的必选，右边是U类型可选
 */
export type AssignPartial<T, U extends keyof T> = MyOmit<T, U> & MyPartial<MyPick<T, U>>

/**
 * 获取函数返回值类型
 */

export type GetFnReturn<T> = T extends (...args: any[]) => infer U ? U : T

/**
 * 获取函数形参类型
 */
export type GetFnValue<T> = T extends (...args: (infer U)[]) => any ? U : T

/**
 * 获取对象属性类型
 * [A, B, C, D] => [string, number, boolean, ...]
 * ? A => infer只有一个参数则结果为联合类型 string｜number｜boolean
 */
export type GetObjType<T> = T extends {
  name: infer A
  age: infer B
  home: infer C
  isShow: infer D
}
  ? [A, B, C, D]
  : T

/**
 * 获取参数形参类型，放入元组中
 */
export type MyParameters<T extends (...args: any) => any> = T extends (...args: infer U) => any
  ? U
  : never
type MyParametersTest = MyParameters<(name: string, age?: number) => any>

/**
 * 推导数组的所有类型
 */
export type MyFalttenArray<T extends Array<any>> = T extends Array<infer K> ? K : never
type MyFalttenArrayTest = MyFalttenArray<[string, '2', 2, 2]>

/**
 * 推导函数返回值
 */
export type MyReturnType<T extends (...args: any) => any> = T extends (...args: any[]) => infer R
  ? R
  : never

declare type Fn<T> = (...args: any[]) => T
type MyReturnTypeTest = MyReturnType<Fn<string>>

/**
 * 获取没有同时存在于T和U中的类型
 */
export type SymmetricDifference<T, U> = MyExclude<T | U, T & U>
type SymmetricDifferenceTest = SymmetricDifference<'1' | '2' | '3', '5' | '6' | '2'>

/**
 * 判断T中所有类型为函数的keys组成的联合类型
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]: MyNonNullabl<T[K]> extends Function ? K : never
}[keyof T]
type aa = string extends Function ? '1' : '2'
type FunctionKeysTest = FunctionKeys<{
  name: string
  age: 'undefined'
  home: 'null'
  fn: () => any
  callback: (...args: any[]) => void
}>

interface User {
  name: string
  age: number
  occupation: string
}

interface Admin {
  name: string
  age: number
  role: string
}

interface PowerUser extends Omit<User & Admin, 'type'> {
  type: 'poweruser'
}
