import { BookModel } from '../../models/book.js'
import { random } from '../../utils/common.js'
const bookModel = new BookModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '',
  },

  /**
   * 生命周期函数--监听页面加载
   * 普通函数: 不能保存状态, 被调用之后, 结果马上返回(return undefined) 不能把状态留在内部(闭包除外)
   * promise: 对象, 可以保存状态
   */
  async onLoad(options) {
    const hotList = await bookModel.getHotList()
    // hotList.then((res) => {
    //   // console.log(res)
    //   this.setData({
    //     books: res,
    //   })
    // })
    this.setData({
      books: hotList,
    })
  },
  onSearching: function (event) {
    this.setData({
      searching: true,
    })
  },
  onCancel: function (event) {
    this.setData({
      searching: false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // more 每次都要不同，observer 才会生效。
    this.setData({
      more: random(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
