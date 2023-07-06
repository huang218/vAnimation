/**
 * 函数on类型推导
 */

export type Watcher<T> = {
  on<K extends keyof T>(
    eventText: `${string & K}Change`,
    callback: (oldVal: T[K], newVal: T[K]) => void
  ): void
}
declare function watch<T>(params: T): Watcher<T>

const personWatcher = watch({
  fristName: 'hjh',
  age: 15,
  lastName: 'home',
  bool: true
})
personWatcher.on('fristNameChange', (oldVal, newVal) => {})

/**
 * 获取一个函数的返回值类型
 */
type ReturnT<T> = T extends (...args: any) => infer U ? U : never

type func = (a: string, b: number) => boolean
type func1 = (a: string, b: number) => string

type returnVal = ReturnT<func> // boolean
type returnVal1 = ReturnT<func1> // string

/**
 * 获取Promise<?> 类型
 * 递归调用
 */
type PromiseType<T> = T extends Promise<infer U> ? PromiseType<U> : T

type promiseT = PromiseType<string | Promise<Promise<boolean>>> // boolean

/**
 * 获取一个函数第一个参数类型
 */

type GetFristFnArg<T> = T extends (a: infer U, ...args: any[]) => any ? U : never

// testFn
type func2 = (frist: string, last: string) => any
type testVal = GetFristFnArg<func2>

/**
 * 获取一个数组每一项的类型 ---> 联合类型
 */
type GetArrayType<A> = A extends (infer K)[] ? K : never

type testVal1 = GetArrayType<string[]> // string
type testVal2 = GetArrayType<[string, boolean, number]> // string | boolean | number

/**
 * ********************************
 */
type JsTypeMap = {
  string: string
  boolean: boolean
  number: number
  object: object
  function: Function
  symbol: symbol
  undefined: undefined
  bigint: bigint
}

// 获取JsTypeMap  key联合类型
type JsTypeName = keyof JsTypeMap

// 给ArgsMap一个数组联合类型 ， 推导出每一项对应的参数类型
type ArgsMap<T extends JsTypeName[]> = {
  [I in keyof T]: JsTypeMap[T[I]]
}
// T 限制为JsTypeName[]
declare function addImpl<T extends JsTypeName[]>(
  ...args: [...T, (...args: ArgsMap<T>) => any]
): void
addImpl('string', 'object', (a, b) => {})

/**
 * 协变 逆变
 */

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer K) => any
  ? K
  : never

type test4 = { a: string } | { b: number } | { c: boolean }

type Val = UnionToIntersection<test4>
const value: Val = {
  a: '1',
  b: 1,
  c: false
}

// Test案例
type Small = { a: string } | { b: number } | { c: boolean } // 大类型
type Big = { a: string } & { b: number } & { c: boolean } // 小类型

// 协变 小类型传给大类型
const small: Small = { a: '1', b: 1 }
const big: Big = { a: '1', b: 1, c: false }

// big = small // OK
// small = big // Error

// 逆变  大类型传给小类型  联合类型转为交叉类型
const fn1 = (x: Big) => {}
const fn2 = (x: Small) => {}

// fn2 = fn1 // OK
// fn1 = fn2 // Error
