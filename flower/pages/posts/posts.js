// pages/posts/posts.js
import { postList } from '../../data/data.js'
// console.log(postList)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // data 中存放所有的初始值, 初始值列表
    a: '2020LPL夏季赛季后赛观赛指南'
  },

  /**
   * 生命周期函数--监听页面加载
   * 钩子函数，hook 
   */
  async onLoad(options) {
    // console.log(123)
    /* 一个 JavaScript 中的数据如何写到 wxml  */
    /* 
      setData
      更新
      创建 + 更新
    */

    /* 大部分页面初始化的相关逻辑，都是写在 onLoad 上面的 */
    // this.setData({
    //   b: '2021',
    // })

    /* 将一个对象数组外面包一层，变成对象，然后传入 setData 函数中 */
    // this.setData({ posts: content })

    this.setData({ postList })
    // 新增缓存
    wx.setStorageSync(
      'flag', true
    )
    // wx.setStorageSync(
    //   'key1', 1
    // )
    // wx.setStorageSync(
    //   'key2', 22222
    // )
    // 删除缓存
    // wx.removeStorageSync('key')
    // 清空所有缓存
    // wx.clearStorageSync()
    // 读取缓存
    const flag = await wx.getStorageSync('flag')
    console.log(flag)
  },

  onGoToDetail(event) {
    // console.log(event)
    // console.log(event.currentTarget.dataset.postId)
    /* 获取自定义事件传递的(数据)参数 */
    /* 从 data- 中获取到数据 */
    const pid = event.currentTarget.dataset.postId || event.detail.pid
    // console.log(event)
    wx.navigateTo({
      url: '/pages/posts-detail/post-detail?pid=' + pid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   * 条件触发
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   * 条件触发
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})