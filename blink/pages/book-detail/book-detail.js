import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    likeCount: 0,
    comments: [],
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      页面接收参数: 所有的参数都在 onLoad 生命周期函数的参数 options 中, 自定义事件 子组件 => 父页面
      组件接收参数: 自定义 property 父页面 => 子组件
    */
    /* 轻提示, 加载页面前 Loading */
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    const comments = bookModel.getComments(bid)

    Promise.all([detail, likeStatus, comments]).then((res) => {
      /* res 就是  [detail, likeStatus, comments] 三个 promise 返回的结果组成的数组 */
      this.setData({
        book: res[0],
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums,
        comments: res[2].comments,
      })
      /* 数据加载完成之后, 取消显示 Loading */
      wx.hideLoading()
    })
    /* 并行 效率大于 串行 */
    // detail.then((res) => {
    //   console.log(res)
    //   this.setData({
    //     book: res,
    //   })
    // })
    // likeStatus.then((res) => {
    //   console.log(res.like_status) // 0 需要转化
    //   console.log(res.fav_nums)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums,
    //   })
    // })
    // comments.then((res) => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments,
    //   })
    // })
  },
  onLike(event) {
    /* 点赞 OR 取消点赞 向服务器发送数据 */
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event) {
    /* 假输入框的显示, 每一次用户 tap 的时候, 都需要弹出真正的输入框 */
    this.setData({
      posting: true,
    })
  },
  onCancel(event) {
    /*
      点击 取消 按钮, 隐藏真正的输入框
    */
    this.setData({
      posting: false,
    })
  },
  onPost(event) {
    // tag 标签 OR input 中的 value, 二者只能取其一
    const comment = event.detail.text || event.detail.value
    /* 防止用户输入空数据 */
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none',
      })
      return
    }
    /* 发送请求 */
    bookModel.postComments(this.data.book.id, comment).then((res) => {
      /* 成功提交后, 友好提示用户 */
      wx.showToast({
        title: '+ 1',
        icon: 'none',
      })
      /* 将用户添加的短评添加到数组的第一项 */
      this.data.comments.unshift({
        content: comment,
        nums: 1,
      })
      /* 更新数据, 关闭蒙层 */
      this.setData({
        comments: this.data.comments,
        posting: false,
      })
    })
  },
})
