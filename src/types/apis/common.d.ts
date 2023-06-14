import { weatherType } from '../view'

export interface RegionType {
  adcode: string
  city: string
  info: string
  infocode: string
  province: string
  rectangle: string
  status: string
}
export interface WeathersType {
  count: string
  info: string
  infocode: string
  lives: Array<weatherType>
  status: string
}
