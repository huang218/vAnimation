import { defineStore } from 'pinia'
import { userStoreTypes } from '@/types'
import { Local } from '@/utils'
import { LoginServerice } from '@/apis'

const createUser = (): userStoreTypes => {
  return {
    userInfo: {},
    token: ''
  }
}

export const userStore = defineStore('userStore', {
  state: createUser,
  actions: {
    getUserInfo(): Promise<any> {
      return new Promise((resolve, reject) => {
        LoginServerice.login()
          .then(({ data, success }: any) => {
            if (success) {
              Local.set('token', data.token)
              this.token = data.token
              this.userInfo = data
              resolve(data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logOut(): void {
      this.userInfo = {}
      this.token = ''
      Local.remove('token')
    }
  }
})
