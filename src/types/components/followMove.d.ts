/**
 * 获取T类型的key，返回数组
 */
export type obtainKey<T> = (keyof T)[]
