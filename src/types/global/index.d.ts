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
