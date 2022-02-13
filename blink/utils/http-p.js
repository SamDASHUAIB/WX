import { config, tips } from '../config.js'

// const tips = {
//   /* 错误码 */
//   1: '抱歉，出现了一个错误',
//   1005: 'appkey无效，请前往www.7yue.pro申请',
//   3000: '期刊不存在',
// };

class HTTP {
  /*
    函数参数的默认值可以让别人一眼看出, 函数到底需要传入什么参数
  */
  request({ url, data = {}, method = 'GET' }) {
    // 使用 Promise 包裹异步请求, Promise 可以 return 没有剥夺函数 return 的能力 -> 无需层层传递 callback
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    /* wx.request 异步, 需要一个 callback */
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      /* callback, 服务器返回数据(res 参数携带服务器返回的结果)的时候 */
      success: (res) => {
        // console.log(res)
        /* statusCode 是一个 Number 类型, 不是一个字符串类型 */
        let code = res.statusCode.toString()
        /* 2xx 表示请求数据成功 */
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code) /* 多层嵌套使用箭头函数 this 就不会变 */
        }
      },
      fail: (err) => {
        /* 网络中断... fail 的情况比较少见 */
        reject()
        this._show_error(1)
      },
    })
  }

  /* _ 下划线表示私有方法, 不要从外部调用 */
  _show_error(error_code) {
    if (!error_code) {
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
