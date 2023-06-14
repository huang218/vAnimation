export const hasLength = (target: Array<any>) => target && target.length > 0

/** element 组件的全局配置size  因为这个是全局的,故写在于此 */
export const componentSize = ['large', 'default', 'small'] as const

/** 国际化 因为这个是全局的,故写在于此 */
export const i18n = [
  {
    label: '简体中文',
    value: 'zh-cn'
  },
  {
    label: 'English',
    value: 'en'
  }
] as const

export const treeToArray = <T>(tree: T[]) => {
  let res: T[] = []
  for (const item of tree) {
    const { children, ...i } = item as any
    if (children && children.length) {
      res = res.concat(treeToArray(children))
    }
    res.push(i)
  }
  return res
}

// 封装一个打印日志的函数
// 解构，再使用不会被vite打包给屏蔽
const { log, error, warn } = console
// 指在开发环境或者localStorage设置showLog===1的时候展示log
const showLog = import.meta.env.VITE_NODE_ENV === 'dev' || localStorage.getItem('showLog') === '1'
// 生产环境随便给他一个函数意思一下
const hideLogFunc = (...args) => args
export const WebLogger = {
  log: showLog ? log.bind(console) : hideLogFunc,
  error: showLog ? error.bind(console) : hideLogFunc,
  warn: showLog ? warn.bind(console) : hideLogFunc
}
