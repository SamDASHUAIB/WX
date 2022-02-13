import {Http} from "./http";

/**
 * 分页数据细节 需要一个数据结构(Object key-value), 来判断这些状态
 *  一条数据都没有
 *  最后一页, 还有没有更多的数据
 *  累加, setData 重新渲染页面 全部渲染
 * 分页数据的加载状态
 *  正在加载
 *  加载完成
 *  没有更多数据了
 * start count
 * 性能优化, 前端限制
 *  数据锁(防抖, 节流)
 *    避免用户重复发送请求,
 *    必须等第一次请求的结果有了, 才允许继续发送请求, 否则数据重复等现象(服务器压力大, 数据库查询消耗资源)
 * 按钮 button 防抖, 节流
 *  禁用状态, 倒计时, 模态框 loading
 */
class Paging {
  /*不关心细节, 当我们需要下一页的数据时候, Paging 直接给分页数据*/
  // Paging 保存状态, 实例化 Paging 对象的形式 new Paging
  start
  count
  req
  locker = false
  url
  moreData = true
  accumulator = []

  constructor(req, count = 10, start = 0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url // 保存最原始的 url
  }

  async getMoreData() {
    //  数据锁 getLocker 的状态, 没锁住, 才允许发送请求
    if (!this._getLocker()) {
      return
    }
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }

  /**
   * 获取锁的状态, true 表示锁住 false 表示未锁住
   * @returns {boolean}
   * @private
   */
  _getLocker() {
    if (this.locker) {
      // 少用 else 多用 return, 用 return 提前结束分支, 就不用继续往后想了, 可读性强, 思维减负
      return false
    }
    this.locker = true // 记得"锁住"
    return true

  }

  /**
   * 释放锁, 也就是还原锁的状态 false
   * @private
   */
  _releaseLocker() {
    this.locker = false
  }

  async _actualGetData() {
    const req = this._getCurrentReq()
    if (!this.moreData) {
      return null
    }
    let paging = await Http.request(req)
    if (!paging) {
      return null
    }
    // 一条数据都没有
    if (paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    // 有数据
    this.moreData = Paging._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      // 累加, 为下一次数据做准备, 如果有 moreData 的话
      this.start += this.count
    }
    this._accumulate(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
    // return {
    //   empty: boolean,
    //   items: [],
    //   moreData: boolean,
    //   accumulator: []
    // }
  }

  /**
   * params 分页参数拼接, count 可能不会变, 但是 start 累加,
   * 每次新请求都会变, 所以需要定义一个方法, 每一次请求都获取到新的 start
   * @private
   */
  _getCurrentReq() {
    // let url = this.req.url 不要从 req.url 中取, 会出现重复拼接的 bug
    let url = this.url // this.url 保存了最原始的 url 不会出现重复拼接的 bug
    const params = `start=${this.start}&count=${this.count}`
    /**
     * url 的可能性
     *   url = `v1/spu/latest` 没有 '?' 那我们直接 + params
     *   url = `v1/spu/latest?key=value` 已经有了一个 "?" 我们需要 "&" + params
     */
    if (url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    this.req.url = url
    return this.req
  }

  /**
   * @param totalPage 一共有多少页
   * @param pageNum 当前的页码 注意! 从 0 开始计数
   * @private
   */
  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }

  _accumulate(items) {
    this.accumulator = [...this.accumulator, ...items]
  }
}

export {Paging}