import { config, tips } from '../config'
/* 导入, 导出, 使用 相对路径, 不要使用绝对路径 */
class HTTP {
  // 对象的解构 + 参数默认值
  request({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }
  _request(url, resolve, reject, method = 'GET', data = {}) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
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
          resolve(res.data)
        } else {
          reject() // 无需处理任何逻辑, 仅仅将 Promise 的状态凝固
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      /* 网络错误, 请求错误 */
      fail: (err) => {
        reject() // 无需处理任何逻辑, 仅仅将 Promise 的状态凝固
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
