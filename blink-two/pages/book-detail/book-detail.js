import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'

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
   * option 接收到 跳转过来的页面(组件) 传递的 路径参数(?key=val)
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.bid
    const detail = bookModel.getDetail(id)
    const like = bookModel.getLikeStatus(id)
    const comments = bookModel.getComments(id)
    // 串行
    // detail.then((res) => {
    //   console.log(res)
    //   this.setData({ book: res })
    // })
    // comments.then((res) => {
    //   console.log(res)
    //   this.setData({ comments: res.comments })
    // })
    // like.then((res) => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums,
    //   })
    // })
    // 并行
    Promise.all([detail, comments, like]).then((res) => {
      wx.hideLoading()
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums,
      })
    })
  },
  onLike(event) {
    // console.log(event) 拿到 detail 下面的我们传递的状态(behavior)
    /* 要传递 400 代表书籍类型 */
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({ posting: true })
  },
  onCancel(event) {
    this.setData({ posting: false })
  },
  onPost(event) {
    // tapping OR input 输入框
    const comment = event.detail.text || event.detail.value
    // 非空检验
    if (!comment) {
      return
    }
    // 用户短评, 必须限制在 12个字以内
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    // 发送请求
    bookModel.postComment(this.data.book.id, comment).then((res) => {
      wx.showToast({
        title: '+ 1',
        icon: 'none',
      })
      /* 修改数组(页面未更新) */
      this.data.comments.unshift({
        content: comment,
        nums: 1,
      })
      /* 更新(页面响应) */
      this.setData({
        comments: this.data.comments,
        posting: false,
      })
    })
  },
  onClose(event) {
    this.setData({
      posting: false,
    })
  },
})
