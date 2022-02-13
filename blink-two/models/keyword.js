import { HTTP } from '../utils/http-p'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    /* 非空检验 */
    if (!words) {
      return []
    }
    return words
  }
  getHot() {
    return this.request({ url: '/book/hot_keyword' })
  }
  addToHistory(keyword) {
    // value 写入缓存是一个数组, 而不是单个的值
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }
