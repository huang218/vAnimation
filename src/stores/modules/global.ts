import { defineStore } from 'pinia'
import { Loading } from '@/types'

export const createLoading = (): Loading => {
  return {
    globalLoading: false
  }
}

export const settingsLoading = defineStore('settingsLoading', {
  state: createLoading,
  actions: {
    setLoading(status: Partial<Loading['globalLoading']>): void {
      this.globalLoading = status
    }
  }
})
