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
// 防抖节流 配置参数类型
export interface UtilsCommon {
  leading?: boolean
  maxWait?: number
  trailing?: boolean
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

type A2 = 'x' | 'y' extends 'x' ? 1 : 2

type A3<T> = T extends 'x' ? 1 : 2
type A4 = A3<'x' | 'y'>

// A2 和 A4 结果不一样 为什么？
// 如果用于简单的条件判断，则是直接判断前面的类型是否可分配给后面的类型
// 若extends前面的类型是泛型，且泛型传入的是联合类型时，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型（是一个分发的过程）。
// extends前面的参数为联合类型时则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。

// 阻止分发特性
type A5<T> = [T] extends ['x'] ? 1 : 2
type A6 = A5<'x' | 'y'>

/**
 * 类型兼容性
 * 类型系统中，如果一个类型的属性更具体，则该类型是子类型（因为属性更少则说明该类型约束更宽泛，是父类型）
 * 子类型比父类型更加具体,父类型比子类型更宽泛。
 */

// 可赋值性
interface Animal {
  name: string
}
interface Car extends Animal {
  break: number
}
export let animal: Animal
export let car: Car

// animal = car // success
// car = animal // 错误， animal缺少break属性

interface User {
  name?: string;
  age?: number;
}

export declare function GetUserInfoA (value: number): User | undefined;
export declare function GetUserInfoA (value: string, count: number): User[];
