import { storeToRefs } from 'pinia'
import { Loading } from '@/types'
import { settingsLoading } from '@/stores'

export const useLoading = () => {
  const loadingStore = settingsLoading()
  const { globalLoading } = storeToRefs(loadingStore)
  const setLoading = (status: Required<Loading['globalLoading']>): void => {
    loadingStore.setLoading(status)
  }
  return {
    loading: globalLoading,
    setLoading
  }
}
