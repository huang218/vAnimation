// import { request } from '@/utils/request'
import axios from 'axios'

export class commonServer {
  /**
   * 查询ip归属地 26c067d98dc0aac59a97eaa2a204ab62
   */
  public static async region(params) {
    return axios<any>({
      url: 'https://restapi.amap.com/v3/ip',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params
    })
  }
  /**
   * 查询地区气温
   */
  public static async weather(params) {
    return axios<any>({
      url: '//restapi.amap.com/v3/weather/weatherInfo',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params
    })
  }
}
