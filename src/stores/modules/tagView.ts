import { defineStore } from 'pinia'
import { Menu, TagViewStoreType } from '@/types'

export const createTagView = (): TagViewStoreType => {
  return {
    visitedViews: [
      {
        name: '首页',
        path: '/dashboard',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          isKeepAlive: true,
          isTagView: true,
          isAffix: true
        }
      }
    ],
    cachedViews: ['首页'],
    currentView: '/dashboard'
  }
}

export const tagViewStore = defineStore('tagViewStore', {
  state: createTagView,
  actions: {
    addVisitedViews(route: Menu) {
      if (this.visitedViews.find((item) => item.name === route.name)) return
      this.visitedViews.push(route)
    },
    addCachedViews(route: Menu) {
      if (this.cachedViews.includes(route.name)) {
        if (route.meta.isKeepAlive) return
        this.removeCachedViews(route.name)
      } else {
        this.cachedViews.push(route.name)
      }
    },
    removeVisitedViews(route: Menu) {
      this.visitedViews = this.visitedViews.filter((v) => v.name !== route.name)
    },
    removeCachedViews(name: Menu['name']) {
      this.cachedViews = this.cachedViews.filter((v) => v !== name)
    },
    deleteTagView(route: Menu) {
      const curIndex = this.visitedViews
        .map((r) => {
          return r.path
        })
        .indexOf(route.path)

      this.removeVisitedViews(route)
      this.removeCachedViews(route.name)
      if (this.currentView === route.path) {
        const cur = this.visitedViews.length - 1 === curIndex
        this.currentView = this.visitedViews[cur ? curIndex : curIndex - 1]?.path
      }
    },
    addTagView(route: Menu) {
      this.addCachedViews(route)
      this.addVisitedViews(route)
      this.addCurrentView(route.path)
    },
    // 当前选中路由
    addCurrentView(path: Menu['path']) {
      this.currentView = path
    },
    // 关闭左边tag
    async closeLeftTagView(rot: Menu) {
      const findIndex = this.visitedViews.findIndex((item) => item.name === rot.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (index >= findIndex) {
          return item
        }
      })
      this.cachedViews = this.visitedViews.map((item) => item.name) // 重置cachedViews数据

      // if()
    },
    // 关闭右边tag
    closeRightTagView(rot: Menu) {
      const findIndex = this.visitedViews.findIndex((item) => item.name === rot.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (findIndex >= index) {
          return item
        }
      })
      this.cachedViews = this.visitedViews.map((item) => item.name)
    },
    // 关闭其他
    closeOtherTagView(rot: Menu) {
      const emitAffixList = this.visitedViews.filter((item) => item.meta.isAffix)
      this.visitedViews = emitAffixList.concat(
        this.visitedViews.filter((item) => !item.meta.isAffix && item.name === rot.name)
      )
      console.log(this.visitedViews)

      this.cachedViews = this.visitedViews.map((item) => item.name)
    },
    // 关闭所有
    closeAllTagView() {
      this.visitedViews = this.visitedViews.filter((item) => item.meta.isAffix)
      this.cachedViews = this.visitedViews.map((item) => item.name)
    }
  }
})
