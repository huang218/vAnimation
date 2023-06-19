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
// fa
type MyPick<T> = {}
