/**
 * 函数on类型推导
 */
type Watcher<T> = {
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
personWatcher.on('lastNameChange', (oldVal, newVal) => {})

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

type promiseT = PromiseType<Promise<Promise<boolean>>> // boolean

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
