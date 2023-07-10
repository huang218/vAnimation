export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key: string) => {
      return key.split('.').reduce((a, b) => {
        if (a) return a[b]
      }, options)
    }
  }
}
