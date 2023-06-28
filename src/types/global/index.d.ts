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

// 解耦类型 ----------------------------------------------------------------
/**单个提问数据结构 */
interface QsData {
  avator?: string
  time?: number | string
  name?: string
  quesitons: {
    title: string
    picture: string[]
  }
}

/**单个回答数据结构 */
interface AsData {
  avator?: string
  time?: number | string
  name?: string
  answers: {
    text: string
    audio?: {
      url: string
      total: number
    }
  }
}
// 解耦 ⬇️
interface Qs {
  avator?: string
  time?: number | string
  name?: string
}
interface DataOne {
  quesitions: {
    title: string
    picture: string[]
  }
}
interface DataTwo {
  answers: {
    text: string
    audio?: {
      url: string
      total: number
    }
  }
}
// 混入接口。交叉类型
type Mixin<U, T> = U & T
type MixWithDataAvAtor<T> = Mixin<Qs, T>
export interface TestConfig {
  asker: MixWithDataAvAtor<DataOne>
  answer?: MixWithDataAvAtor<DataTwo>
}
// 结束 ----------------------------------------------------------------
