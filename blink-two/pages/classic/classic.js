import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
// import { HTTP } from '../../utils/http'
// let http = new HTTP()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    likeStatus: false,
    likeCount: 1,
    classic: null,
    latest: true,
    first: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 在 onLoad 中发送请求, 得到数据 */
    /* 回调函数 + 异步, 剥夺了函数(异步) return 数据的能力 */
    /* 设计数据传递的每一步, 都需要传递一个 callback, 这很麻烦 */
    classicModel.getLatest((res) => {
      /* 数据初始化(未在 data 中定义) + 数据更新 */
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums,
      })
    })
  },
  onLike(event) {
    // console.log(event) 拿到 detail 下面的我们传递的状态(behavior)
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext() {
    this._updateClassic('next')
  },
  onPrevious() {
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    // _updateClassic 压根不管 classic 是从缓存中还是 request 请求中来的, 良好封装, 不管实现细节, 拿到自己需要的数据就 ok
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
      })
    })
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums,
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
