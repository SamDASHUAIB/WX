import { HTTP } from '../utils/http-p.js'
class KeywordModel extends HTTP {
  /* 历史关键字, 从缓存中获取 */
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    /* 排除 null 报错 */
    if (!words) {
      return []
    }
    return words
  }
  /* 热门关键字, 从服务器中获取 */
  getHot() {
    return this.request({
      url: '/book/hot_keyword',
    })
  }

  /* 将用户输入的搜索缓存到 storage */
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    /* 队列 */
    if (!has) {
      /* 检测, 数组 words 是否长度超过 10, 超出的话, 将末尾元素移除 */
      if (words.length >= this.maxLength) {
        words.pop()
      }
      /* 没有重复, 添加到缓存中, 添加到头部 */
      words.unshift(keyword)
      /* 将用户的搜索更新到 words 数组中 */
      wx.setStorageSync(this.key, words)
    }
  }
}
export { KeywordModel }
