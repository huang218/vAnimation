import { useRouter } from 'vue-router'

/**
 * 封装路由操作
 */
export function useRouterJump() {
  const router = useRouter()

  // push
  const pushRouter = (path: string, query = {}) => {
    router.push({ path, ...query })
  }
  // replace
  const replaceRouter = (path: string, query = {}) => {
    router.replace({ path, query })
  }
  // 前进 后退
  const goRouter = (delta: number) => {
    router.go(delta)
  }

  return {
    pushRouter,
    replaceRouter,
    goRouter
  }
}
