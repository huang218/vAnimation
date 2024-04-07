import Mock from './mock'

export class userServerice {
  // 获取用户按钮
  public static async getUserMenu() {
    return new Promise((resolve) => {
      return resolve(Mock.menu)
    })
  }
}
