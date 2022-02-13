const app = getApp()
Page({
  data: {
    movies: [],
    _type: ''
  },
  onLoad: function (options) {
    const type = options.type
    this.data._type = type
    console.log(type)
    wx.request({
      url: app.gBaseUrl + type,
      data: {
        start: 0,
        count: 12,
      },
      success: result => {
        // console.log(result)
        this.setData({
          movies: result.data.subjects,
        })
      }
    })
  },
  onReady() {
    let title = '电影'
    // console.log(this.data._type)
    switch (this.data._type) {
      case "in_theaters":
        title = '正在热映'
        break
      case "coming_soon":
        title = '即将上映'
        break
      case "top250":
        title = '豆瓣Top250'
    }
    wx.setNavigationBarTitle({
      title: title,
    })

  },
  onReachBottom() {
    // 下拉, 开始加载, 轻提示
    wx.showNavigationBarLoading()
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data: {
        start: this.data.movies.length,
        count: 12,
      },
      success: result => {
        // console.log(result)
        this.setData({
          movies: [...this.data.movies, ...result.data.subjects]
        })
        // 数据请求完成, 结束加载
        wx.hideNavigationBarLoading()
      }
    })
  },
  // 下拉触发
  onPullDownRefresh() {
    // 下拉请求数据
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data: {
        start: 0,
        count: 12,
      },
      success: result => {
        // console.log(result)
        this.setData({
          movies: result.data.subjects
        })
        // 关闭动画
        wx.stopPullDownRefresh()
      }
    })
  }
});