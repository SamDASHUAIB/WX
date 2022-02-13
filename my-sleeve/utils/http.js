import {config} from "../config/config";
import {promisic} from "./promisic";

export class Http {
  static async request({
                         url,
                         method = 'GET',
                         data = {},

                       }) {
    // 一定要把 await 的结果 return 出去, 才有用
    const res  = await promisic(wx.request)({
      url: config.apiBaseUrl + url,
      method: method,
      data: data,
      header: {
        appkey: config.appkey,
        clientkey: config.clientkey,
      },
    })
    return res.data
  }

}