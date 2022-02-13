// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 设置全局变量,
  // 不能被修改, 只读, 不能用作计数器, 每一次小程序重启都会重新初始化,
  gIsPlayingMusic: false, // 当前音乐没有播放
  gIsPlayingPostId: -1,
  gBaseUrl: "http://t.talelin.com/v2/movie/"
})
