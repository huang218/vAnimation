import { customRef } from 'vue'

export function useDebouncedRef(date, delay = 500) {
  return customRef((getFn, setFn) => {
    let times
    return {
      get() {
        getFn()
        return date
      },
      set(newVal) {
        if (times) clearTimeout(times)
        times = setTimeout(() => {
          date = newVal
          setFn()
        }, delay)
      }
    }
  })
}
