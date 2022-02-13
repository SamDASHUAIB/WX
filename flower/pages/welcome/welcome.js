// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /* 跳转页面 */
  onTap: function (params) {
    console.log(1)
    /* 子页面，可以返回 子子 子子子。。。 10个页面，保留父页面，跳转到子页面上 */
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })
    /* 卸载当前页面，跳转到目标页面 */
    // wx.redirectTo({
    //   url: '/pages/posts/posts',
    // })
    /* 普通页面 => 带有 tab 选项卡的页面, 不能使用 redirectTo */
    wx.switchTab({
      url: '/pages/posts/posts',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
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