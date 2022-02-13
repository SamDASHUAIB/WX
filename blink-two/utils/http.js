import { config, tips } from '../config'
/* 导入, 导出, 使用 相对路径, 不要使用绝对路径 */
class HTTP {
  request(params) {
    /*
      url
      data
      method
    */
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success: (res) => {
        /* 4xx 错误也在此进行处理 */
        /* 返回的状态码 code 是一个 number 没有 startsWith 方法, 需要转成字符串 */
        let code = res.statusCode + ''
        // console.log(typeof code);
        if (code.startsWith('2')) {
          // console.log(res) 自己玩
          /* 将 res (数据) 通过回调函数 request 函数的调用者(Model 下的方法) */
          if (params.success) {
            /* success 回调是可选的, post 请求无需返回结果, 因此也就不需要 success */
            params.success(res.data)
          }
        } else {
          console.log(res.data)
          let error_code = res.data.error_code

          console.log(error_code)
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        /* 网络错误, 请求错误 */
        this._show_error(1)
      },
    })
  }
  _show_error(error_code) {
    /* 默认情况 error_code 为空, 给一个默认值 */
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}
export { HTTP }
