let shouldTrack = false // 是否可收集依赖
let activeEffect = null // 存储当前依赖
// 保存原始对象与依赖集合之间的关系
const targetMap = new WeakMap()

export const reactive = (obj) => {
  // for (const item in obj) {
  //   if (typeof obj[item] === 'object') {
  //     return reactive(obj[item])
  //   }
  // }
  return new Proxy(obj, {
    get: function (target, key) {
      if (shouldTrack) {
        track(target, key)
      }
      return Reflect.get(target, key)
    },
    set: function (target, key, value) {
      const oldVal = Reflect.get(target, key)
      if (oldVal === value) return true
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}

export class Ref {
  constructor(value) {
    this._value = value
    this.__v_isRef = true
    this.depsList = new Set()
  }
  // eslint-disable-next-line getter-return, prettier/prettier
  get value () {
    if (shouldTrack) {
      trackEffect(this.depsList)
    }
    return this._value
  }
  // eslint-disable-next-line prettier/prettier
  set value (value) {
    this._value = value
    triggerEffect(this.depsList)
  }
}

// 依赖收集
// eslint-disable-next-line prettier/prettier
function track (target, key) {
  let keyDeps = targetMap.get(target)
  if (!keyDeps) {
    keyDeps = new Map()
    targetMap.set(target, keyDeps)
  }
  let deps = keyDeps.get(key)
  if (!deps) {
    deps = new Set()
    keyDeps.set(key, deps)
  }
  trackEffect(deps)
}

// eslint-disable-next-line prettier/prettier
function trackEffect (deps) {
  deps.add(activeEffect)
}

// 触发依赖
// eslint-disable-next-line prettier/prettier
function trigger (target, key) {
  const keyDeps = targetMap.get(target)
  const deps = keyDeps.get(key)
  triggerEffect(deps)
}

// eslint-disable-next-line prettier/prettier
function triggerEffect (deps) {
  for (const dep of deps) {
    dep()
  }
}

// eslint-disable-next-line prettier/prettier
export function effect (fn) {
  activeEffect = fn
  shouldTrack = true
  fn()
  shouldTrack = false
  activeEffect = null
}
