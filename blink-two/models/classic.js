import { HTTP } from '../utils/http'

class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        /* 通过 callback 将数据传递给 getLatest 函数的调用者 */
        callback(res)
        /* 緩存 latestIndex */
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      },
    })
    // return res  无效
  }
  // getPrevious(index, callback) {
  //   this.request({
  //     url: `/classic/${index}/previous`,
  //     success: (res) => {
  //       callback(res)
  //     },
  //   })
  // }
  // getNext(index, callback) {
  //   this.request({
  //     url: `/classic/${index}/next`,
  //     success: (res) => {
  //       callback(res)
  //     },
  //   })
  // }

  getClassic(index, nextOrPrevious, callback) {
    // 缓存 => 未命中 => 发送请求 => 写入缓存
    // 哪些内容可以被缓存, 哪些数据不能够被缓存或者说实时性要求高的, 必须从缓存中取到
    // this.getClassic 获取新的 classic(上一期 OR 下一期), 因此 index 需要 +1 或者 -1
    let key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          // 写入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res)
        },
      })
    } else {
      // 拿到缓存, 传递数据(时刻牢记, 异步需要使用 callback )
      callback(classic)
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }
  isLatest(index) {
    // latestClassic(latestIndex) currentClassic (currentIndex 就是我们传入的 index)
    let latestIndex = this._getLatestIndex()
    return latestIndex === index ? true : false
  }
  /* 函数名本身就是一个非常好的注释 */
  _setLatestIndex(index) {
    /* 同步 */
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    /* 同步 */
    return wx.getStorageSync('latest')
  }
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

}
export { ClassicModel }
