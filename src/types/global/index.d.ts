export interface HttpGlobalResponse<T = any> {
  code: number
  success: boolean
  message: string
  data: T
}

export interface PageInfo {
  pageNum: number
  pageSize: number
  total: number
}

export interface GlobalUrl {
  WS_URL: string
  BASE_URL: string
}

// 全局loading类型
export interface Loading {
  globalLoading: boolean
}
type union = string | boolean | symbol

// 递归遍历可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Object ? DeepPartial<T[P]> : T[P]
}

// 将属性变为可选
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// 将属性变为必选
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

// 以U联合类型为准，查找T中相应的类型，生成新的类型
type MyPick<T, U extends keyof T> = {
  [P in U]: T[P]
}
// 从T联合类型中中排除U类型 / 联合类型
type MyExclude<T, U> = T extends U ? never : T

// 从T接口中排除K联合类型的属性
type MyOmit<T, K extends union> = {
  [P in MyExclude<keyof T, K>]: T[P]
}

// 过滤null 、undefined
type MyNonNullable<T> = T extends null | undefined ? never : T

// Record
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

// Readonly -? // ?
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// NonNullable 联合类型去除null、undefined
type MyNonNullabl<T> = T extends null | undefined ? never : T
