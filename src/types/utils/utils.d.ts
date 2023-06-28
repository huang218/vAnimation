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
 * 从T联合类型中中排除U类型 / 联合类型
 */
export type MyExclude<T, U> = T extends U ? never : T

/**
 * 从T接口中排除K联合类型的属性
 */
export type MyOmit<T, K extends any> = {
  [P in MyExclude<keyof T, K>]: T[P]
}

/**
 * 过滤null 、undefined
 */
export type MyNonNullable<T> = T extends null | undefined ? never : T

/**
 * Record
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
export type MyNonNullabl<T> = T extends null | undefined ? never : T

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
