import { config, tips } from '../config.js'

class HTTP {
  request(params) {
    // url, data, method,
    if (!params.method) {
      // 给一个默认的 method 
      params.method = 'GET'
    }
    /* wx.request 异步, 传入两个回调, success 以及 fail, 可以获取响应成功 OR 响应失败的结果 */
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      /* 多层嵌套使用箭头函数 this 就不会变 */
      success: (res) => {
        /* statusCode 是一个 Number 类型, 不是一个字符串类型 */
        let code = res.statusCode.toString()
        /* 2xx 表示请求数据成功 */
        if (code.startsWith('2')) {
          /*  callback params.success 开始执行, 携带异步请求的结果 */
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code) 
        }
      },
      fail: (err) => {
        /* 网络中断... fail 的情况比较少见 */
        this._show_error(1)
      },
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      // 给一个默认的 错误码
      error_code = 1
    }
    const tip = tips[error_code] /* 数字类型的 key 需要使用 [] 来取到 */
    wx.showToast({
      title: tip ? tip : tips[1] /* title 要根据错误类型动态改变 */,
      icon: 'none',
      duration: 2000,
    })
  }
}

export { HTTP }
