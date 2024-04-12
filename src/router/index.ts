import { createRouter, createWebHashHistory, isNavigationFailure } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Local } from '@/utils'
import { routerStore, tagViewStore } from '@/stores'
import Login from '../views/login/index.vue'
import Layout from '@/Layout/layout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: '/login',
      component: Login,
      meta: { title: '登录', isTagView: false }
    },
    {
      path: '/',
      name: '/',
      redirect: '/dashboard',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: '/dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: { title: '工作台', isTagView: false }
        }
      ]
    },
    {
      path: '/login',
      name: '/login',
      component: Login,
      meta: { title: '登陆' }
    }
  ]
})
// 前
router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  const tagStore = tagViewStore()
  const { routerList, curRootRoute, getRouterList, getCurrentRoute } = routerStore()
  const token = Local.get('token')

  if (routerList.length <= 0) {
    try {
      const newRouter = await getRouterList()
      newRouter.forEach((item: any) => router.addRoute(item))
      //跳转到目的路由
      next({ ...to, replace: true })
    } catch (err) {
      console.log(err, '动态添加路由失败')
    }
  }
  if (to.path === '/login') {
    NProgress.done()
    if (token) {
      // 有token时不允许访问登录页面，返回首页
      return next('/')
    } else {
      return next()
    }
  }
  if (to.matched.length === 0) {
    NProgress.done()
    next({ path: '/404' })
  }
  if (!token) {
    const params = JSON.stringify(to.query ? to.query : to.params)
    const url = `/login?redirect=${to.path}&params=${params}`
    NProgress.done()
    return next(url)
  } else {
    // 初始化header默认选择路由
    const routeSplit = to.path.split('/')[1]
    tagStore.addCurrentView(to.path)
    if (routeSplit === '' || routeSplit === 'dashboard') {
      getCurrentRoute('/')
    } else if (curRootRoute != `/${routeSplit}`) {
      getCurrentRoute(`/${routeSplit}`)
    }

    if (Object.keys(from.query).length === 0) {
      // 判断路由来源是否有query
      next()
    } else {
      const toRedirect = from.query.redirect //如果来源路由有query
      //这行是解决next无限循环的问题并且判断redirect--目的路由是否有
      if (to.path === toRedirect || !toRedirect) {
        next()
      } else {
        //跳转到目的路由
        next({
          path: toRedirect as string,
          query: JSON.parse(from.query.params as string)
        })
      }
    }
  }
})

// 路由加载后
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    NProgress.done()
  } else {
    document.title = router.currentRoute.value.meta.title as string
    NProgress.done()
  }
})

export default router
