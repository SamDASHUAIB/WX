/**
 * 基本业务对象
 * banner
 */
import {Http} from "../utils/http";

export class Banner {
  static locationB = 'b-1'
  static locationG = 'b-2'

  static async getHomeLocationB() {
    // Banner.locationB 静态变量, 使用 "类.xxx" 方式, 不能使用 this
    return await Http.request(
      {
        url: `/v1/banner/name/${Banner.locationB}`,
      }
    )
  }

  static async getHomelocationG() {
    // Banner.locationB 静态变量, 使用 "类.xxx" 方式, 不能使用 this
    return await Http.request(
      {
        url: `/v1/banner/name/${Banner.locationG}`,
      }
    )
  }
}