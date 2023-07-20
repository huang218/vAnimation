import { defineStore } from 'pinia'
import { Menu, TagViewStoreType } from '@/types'
import { route } from '@/hooks/useRoute'
import { useRouterJump } from '@/hooks/useRouterJump'

const { pushRouter } = useRouterJump()
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
    removeCachedViews(name: string) {
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
    closeLeftTagView() {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.value.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (index >= findIndex) {
          return item
        }
      })
    },
    // 关闭右边tag
    closeRightTagView() {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.value.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (findIndex >= index) {
          return item
        }
      })
    },
    // 关闭其他
    closeOtherTagView() {
      const emitAffixList = this.visitedViews.filter((item) => item.meta.isAffix)
      this.visitedViews = emitAffixList.concat(
        this.visitedViews.filter((item) => item.name === route.value.name)
      )
    },
    // 关闭所有
    closeAllTagView() {
      this.visitedViews = this.visitedViews.filter((item) => item.meta.isAffix)
    }
  }
})
