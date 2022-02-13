// components/search/index.js
import { KeywordModel } from '../../models/keywords.js'

import { BookModel } from '../../models/book.js'

import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    /* more 得到用户下拉到底的状态, 从而加载更多数据 */
    more: {
      /* 使用 observer 如果要一直触发 more, 那么每一次的 more 都要不同 */
      type: String,
      // loadMore 函数名
      observer: 'loadMore',
      // true, true, true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false, /* 控制 loading 动画显示与隐藏 */
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),
    })

    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot,
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 每次用户下拉到底, 向服务器请求新的数据 */
    loadMore() {
      /* 没有搜索词, 不发送请求, 直接 return */
      if (!this.data.q) {
        return
      }
      /* 用户同时发送两个请求(下拉过快), 会返回重复的数据 */
      /* 解决: 强行要求用户一次只能发送一个请求, 第二次请求必须等待第一次请求结束之后才能发送 */
      /* 锁 */
      if (this.isLocked()) {
        /* 用户正在发送请求, 锁住 */
        return
      }
      /* 避免发送无效请求, 看一看是不是超过或等于了服务器中总的数据条数 */
      if (this.hasMore()) {
        /* 用户需要发送请求, 锁住 */
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          (res) => {
            this.setMoreData(res.books)
            // 请求成功，解开锁
            this.unLocked()
          },
          () => {
            /* 请求失败(但是一次请求流程走完了)也解开锁 */
            this.unLocked()
          }
        )
        // 死锁，需要格外注意。
      }
    },

    onCancel(event) {
      /* 点击取消后, 需要清空 dataArray 等数据, 否则会出现重复的数据  */
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      /* 点击叉号后, 需要清空 dataArray 等数据, 否则会出现重复的数据 */
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      // 搜索页显示
      this._showResult()
      /* 正在加载搜索结果, 显示 loading */
      this._showLoadingCenter()
      // this.initialize()
      /* value 用户输入的文本, text tag 标签的文本 */
      const q = event.detail.value || event.detail.text
      this.setData({
        q,
      })
      bookModel.search(0, q).then((res) => {
        this.setMoreData(res.books)
        /* 服务器得到的数据一共的条数 */
        this.setTotal(res.total)
        // 用户的输入 OR tag 标签作为搜索关键字加入到缓存中
        if (res.books.length) {
          keywordModel.addToHistory(q)
        }
        /* 拿到搜索结果, 隐藏 loading */
        this._hideLoadingCenter()
      })
    },
    /* 显示 loading 动画效果 */
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true,
      })
    },
    /* 隐藏 loading 动画效果 */
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      })
    },

    _showResult() {
      this.setData({
        searching: true,
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: '',
      })
    },

    // onReachBottom(){
    //   console.log(123123)
    // }

    // scroll-view | Page onReachBottom
  },
})
