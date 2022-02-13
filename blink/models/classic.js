// 小程序中 import 只能使用相对路径。
import { HTTP } from '../utils/http.js'
class ClassicModel extends HTTP {
  /* getLatest 也是一个异步的方法 */
  getLatest(sCallback) {
    // this 就是 ClassicModel 的实例对象
    this.request({
      url: '/classic/latest',
      success: (res) => {
        /* /pages/classic/classic.js 文件调用了 getLatest 执行权 转移 => */
        sCallback(res)
        /* 将最新一期期刊号写入到缓存中 */
        this._setLatestIndex(res.index)
        
        /* 每次从服务器获取到数据(最新期刊, 一直在更新, 所以请求前不知道具体的 index 但是请求完成后, 就知道啦), 我们就把它写入到缓存中 */
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      },
    })
    // return res callback 剥夺了函数 return 的能力
  }
  /**
   *
   * @param {回调函数} sCallback
   * @param {期刊号, 上一期 下一期 +1 -1} index
   * @param {后一期还是前一期} nextOrPrevious
   */
  getClassic(index, nextOrPrevious, sCallback) {
    /*
      先在缓存中找, 找不到再发请求
      key 确定 key -> 一个生成 key 的方法
      哪些数据应该缓存, 哪些数据不应该缓存?
      实时性强的数据: 点赞状态
      一次请求基本上就不变的数据: 图片, 文字...
    */
    let key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    // let key = this._getKey(index) getClassic 执行跳转前获取前一篇 OR 后一篇 classic 的行为, 所以 index 需要 +1 或者 -1

    let classic = wx.getStorageSync(key) // string
    /* 缓存未命中, 发送请求 */
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          /* 请求到数据, 写入缓存 */
          wx.setStorageSync(this._getKey(res.index), res) // string string
          sCallback(res)
        },
      })
    } else {
      /* 缓存命中, 直接从缓存中取, callback 携带 取到的 classic */
      sCallback(classic)
    }
  }
  getMyFavor(success) {
    const params = {
      url: `/classic/favor`,
      success: success,
    }
    this.request(params)
  }
  /**
   *
   * @param {期刊号} index
   */
  isFirst(index) {
    /* index === 1 就表示是第一期 */ 
    return index === 1 ? true : false
  }
  /**
   * @param {currentIndex 当前期刊号} index
   * currentIndex(当前用户页面显示的期刊号) latestIndex(通过 getLatest 函数得到的最新期刊号, 缓存起来, 好和 currentIndex 做对比)
   */
  isLatest(index) {
    // 从缓存中取, 最新一期的期刊的 index 值
    let latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }
  getById(cid, type, success) {
    let params = {
      url: `/classic/${type}/${cid}`,
      success: success,
    }
    this.request(params)
  }
  /**
   * 将 最新一期的期刊号保存到 storage 中
   * @param {最新一期的期刊号} index
   */
  _setLatestIndex(index) {
    // wx.setStorageSync({
    //   'latest': index,
    // })
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey(index) {
    /*
      key 自定义, 但是能够辨别哪一期(也就是 key 中要有 index)
    */
    let key = `classic-${index}`
    return key
  }
}
export { ClassicModel }
