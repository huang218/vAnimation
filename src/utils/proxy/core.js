/* eslint-disable no-redeclare */
/* eslint-disable prettier/prettier */

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

export class RefImpl {
  constructor(value) {
    this._value = value
    this.__v_isRef = true
    this.depsList = new Set()
  }
  get value () {
    if (shouldTrack) {
      trackEffect(this.depsList)
    }
    return this._value
  }
  set value (value) {
    this._value = value
    triggerEffect(this.depsList)
  }
}

export function ref (value) {
  return createRef(value, false)
}

function createRef (value, shallow) {
  if (isRef(value)) {
    return value
  }
  return new RefImpl(value, shallow)
}

// 依赖收集
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

function trackEffect (deps) {
  deps.add(activeEffect)
}

// 触发依赖
function trigger (target, key) {
  const keyDeps = targetMap.get(target)
  const deps = keyDeps.get(key)
  triggerEffect(deps)
}

function triggerEffect (deps) {
  for (const dep of deps) {
    dep()
  }
}

export function effect (fn) {
  activeEffect = fn
  shouldTrack = true
  fn()
  shouldTrack = false
  activeEffect = null
}

function isRef (ref) {
  return !!ref && ref.__v_isRef === true
}
