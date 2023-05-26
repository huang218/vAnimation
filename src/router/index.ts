import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { routerStore } from '@/stores/modules/route';
import Login from '../views/login/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "/login",
      component: Login,
      meta: { title: "登录", isTagView: false },
    },
    {
      path: '/',
      name: '/',
      redirect: '/about',
      component: () => import('@/views/home/HomeView.vue'),
      meta: { title: "/", isTagView: false },
      children: [
        {
          path: '/about',
          name: '/about',
          component: () => import('@/views/AboutView.vue'),
          meta: { title: "首页", isTagView: false },
        },
        {
          path: '/indexPage:id',
          name: '/indexPage',
          component: () => import('@/views/parms/indexPage.vue'),
          meta: { title: "indexPage", isTagView: false },
        },
      ]
    },
    {
      path: "/404",
      name: "notFound",
      component: () => import('@/views/error/404.vue'),
      meta: { title: "404" },
    },
  ]
})
// 前
router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  console.log(to, from)
  const token = localStorage.getItem("token");
  if(to.path === '/login') {
    NProgress.done();
    return next()
  }
  if (!token) {
    const params = JSON.stringify(to.query ? to.query : to.params);
    const url = `/login?redirect=${to.path}&params=${params}`;
    NProgress.done();
    return next(url);
  }
  if(to.matched.length === 0) {
    NProgress.done();
    next({ path: '/404' })
  }
  NProgress.done();
  next();
  // if (!token) {
  //   const params = JSON.stringify(to.query ? to.query : to.params);
  //   const url = `/login?redirect=${to.path}&params=${params}`;
  //   next(url);
  // }else {}
  //   next()
  // }
  // const { routerList } = routerStore();
  // const token = localStorage.getItem("token");
  // NProgress.configure({ showSpinner: false });
  // NProgress.start();
  // console.log(to, from ,'beforEach')
  
  // if (to.path === "/login") {
  //   NProgress.done();
  //   return next();
  // }

  
  // next({ ...to, replace: true });
  // if (routerList.length > 0) {
  //   return next();
  // }else {
  //   next({ ...to, replace: true });
  // }
  // 接口获取动态路由
  
  // try {
  //   console.log(to,'123')
  //   // const newRouter = await getRouterList();
  //   // newRouter.forEach((item) => router.addRoute(item));
  //   next({ ...to, replace: true });
  // } catch (err) {
  //   console.log(err, "动态添加路由失败");
  //   NProgress.done();
  // }
})

// 路由加载后
router.afterEach((to, from, failure) => {
  console.log(router.currentRoute,'router.currentRoute',failure)
  if (isNavigationFailure(failure)) {
    NProgress.done();
    console.log("error navigation", failure);
  } else {
    document.title = router.currentRoute.value.meta.title as string;
    NProgress.done();
  }
});

export default router
