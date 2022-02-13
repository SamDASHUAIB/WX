Page({
  data: {},
  onLoad: function (options) {

  },
  onTap(event) {
    //  跳转页面, 保留当前页面, 然后跳转到下一个页面 维护一个 栈 结构
    // wx.navigateTo({
    //   // 跳转使用绝对路径
    //   url: '/pages/posts/posts'
    // })
    // 跳转到带有 tabbar 的页面的时候, 需要使用 wx.switchTab 不能使用 navigateTo 或者 redirectTo
    wx.switchTab({
      url: '/pages/posts/posts'
    })
    // // 销毁当前页面, 跳转到下一个页面
    // wx.redirectTo({
    //   url: '/pages/posts/posts'
    // })
  },
  // redirectTo 触发
  onUnload() {
    console.log('卸载 welcome')
  },
  // navigateTo 触发
  onHide() {
    console.log('隐藏 welcome')
  }

});