import { BookModel } from '../../models/book'
import { KeywordModel } from '../../models/keyword'
import { paginationBev } from '../behaviors/pagination'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    // observer: 'loadMore', 函数名称, 使用 string
    more: {
      type: String,
      observer: 'loadMore',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    loadingCenter: false,
    q: '',
  },

  /**
   * 组件的方法列表
   * 直接和我们的业务数据绑定在一起, 复用性不高
   */
  attached() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      historyWords: keywordModel.getHistory(),
    })
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot,
      })
    })
  },
  methods: {
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {}) // 事件名 detail对象 事件选项
    },
    onConfirm(event) {
      this.initialize()
      /* input 输入框 value OR v-tag 组件传递的 text 值 */
      const q = event.detail.value || event.detail.text
      // 避免用户空输入, 然后, 出现 v-tag 渲染空字符串的情况
      if (!q) {
        return
      }
      this._showResult()
      this._showLoadingCenter()
      bookModel.search(0, q).then((res) => {
        // 第一次拿到 books (20条数据)
        this.setMoreData(res.books)
        // 设置 total, 服务器中有 total 字段
        this.setTotal(res.total)
        this.setData({ q })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    onDelete(event) {
      this.initialize()
      this._closeResult()
    },
    loadMore() {
      // 空值检验
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        /* 正在发送请求, 直接中断请求 加锁 */
        return
      }

      /* 有后续数据, 才发送请求 */
      if (this.hasMore()) {
        /* 开始发送请求前, 锁住 */
        this.locked()
        bookModel
          .search(this.getCurrentStart(), this.data.q)
          .then((res) => {
            this.setMoreData(res.books)
            /* 请求成功, 释放锁 */
            this.unLocked()
          })
          .catch(() => {
            // 请求失败, 网络中断等因素造成, 也需要释放锁
            this.unLocked()
          })
      }
    },
    _showResult() {
      // 展示搜索结果
      this.setData({ searching: true })
    },
    _closeResult() {
      // 隐藏搜索页
      this.setData({ searching: false, q: '' })
    },
    _showLoadingCenter() {
      this.setData({ loadingCenter: true })
    },
    _hideLoadingCenter() {
      this.setData({ loadingCenter: false })
    },
    // _isLocked() {
    //   // 判断 锁状态
    //   return this.data.loading ? true : false
    // },
    // _locked() {
    //   // 加锁
    //   this.setData({
    //     loading: true,
    //   })
    // },
    // _unLocked() {
    //   // 解锁
    //   this.setData({
    //     loading: false,
    //   })
    // },
  },
})
