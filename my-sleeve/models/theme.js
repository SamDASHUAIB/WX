/**
 * 基本业务对象
 * theme banner spu sku address user
 */
import {Http} from "../utils/http";

export class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []
  // 从上到下, 使用 A B C D 等编号, 确定位置, 从而来定义方法 页面(home) + 位置
  // 抽象, getHomeLocationA, getHomeLocationE 都是获取 theme, 应该合并为一个 http 请求
  // static async getHomeLocationA() {
  //   // 一定要把 await 的结果 return 出去, 才有用
  //   return await Http.request(
  //     {
  //       url: '/v1/theme/by/names',
  //       data: {
  //         names: Theme.locationA
  //       },
  //     }
  //   )
  // }
  //
  // static async getHomeLocationE() {
  //   return await Http.request(
  //     {
  //       url: '/v1/theme/by/names',
  //       data: {
  //         names: Theme.locationE
  //       },
  //     }
  //   )
  // }

  async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    this.themes = await Http.request(
      {
        url: '/v1/theme/by/names',
        data: {
          names
        },
      }
    )
  }


  getHomeLocationA() {
    return this.themes.find(t => t.name === Theme.locationA)
  }

  getHomeLocationE() {
    return this.themes.find(t => t.name === Theme.locationE)
  }

  getHomeLocationF() {
    return this.themes.find(t => t.name === Theme.locationF)
  }

  getHomeLocationH() {
    return this.themes.find(t => t.name === Theme.locationH)
  }

  static getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE)
  }

  static getThemeSpuByName(name) {
    // Http.request 本身已经返回一个 Promise 了, 不需要添加 async 保证这是一个 Promise
    return Http.request({
      url: `/v1/theme/name/${name}/with_spu`
    })
  }


}

/**
 * 接口设计与 http 请求
 * 方案一: 每一个数据 http(请求次数 + 消耗资源) => http 请求次数过多, 消耗资源过多, 性能差
 * 方案二: Home 只发送一个 http (请求过于复杂, 消耗服务器带宽也是非常多的) => 数据库查询复杂, 接口可维护性差
 * 方案三: 有选择的把部分 http 请求合并成一个 => 兼顾性能与接口的可维护性, 粒度小, 灵活性强
 */

/**
 * async 强制保证, 最后一定会返回一个 Promise
 * await 等待异步数据的返回, 后续有代码需要执行
 */