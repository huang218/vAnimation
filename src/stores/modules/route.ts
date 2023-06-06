import { defineStore } from 'pinia'
import { RouterStoreTypes, Menu } from '@/types'
import { formatRoutes } from '@/utils/router/index'
import { userServerice } from '@/apis'

export const createRouter = (): RouterStoreTypes => {
  return {
    routerList: [],
    curRootRoute: '/', // header当前选中主路由
    sideBarRouter: [] // 侧边栏当前子路由
  }
}

export const routerStore = defineStore('routerStore', {
  state: createRouter,
  actions: {
    getRouterList(): Promise<Menu[]> {
      return new Promise((resolve, reject) => {
        userServerice
          .getUserMenu()
          .then(({ data, code }: any) => {
            if (code === 200) {
              const newRoute = formatRoutes(data.list)
              this.routerList = newRoute

              resolve(newRoute)
            } else {
              reject(data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getCurrentRoute(rootRoute: string): void {
      console.log(rootRoute, 'rootRoute')

      this.routerList.forEach((item) => {
        if (item.path === rootRoute) {
          this.curRootRoute = rootRoute
          this.sideBarRouter = item.children
        }
      })
    }
  }
})
