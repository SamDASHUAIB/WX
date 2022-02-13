// pages/more-movie/more-movie.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    _type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 路由跳转, 过程中传递过来的数据 type 在 options 里面 */
    const type = options.type
    this.data._type = type
    // console.log(type)
    wx.request({
      url: app.gBaseUrl + type,
      /* ?start=0&count=3 GET + data */
      data: {
        start: 0,
        count: 12
      },
      success: (res) => {
        console.log(res)
        this.setData({
          movies: res.data.subjects
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /* 动态标题, 一个页面设置多个不同的标题, 不能使用配置 json 的方式 */
    let title = ''
    switch ( this.data._type) {
      case 'in_theaters':
        title = '正在热映'
        break;
      case 'coming_soon':
        title = '即将上映'
        break;
      case 'top250':
        title = '豆瓣Top250'
        break;
    
      default:
        break;
    }
    wx.setNavigationBarTitle({
      title: title,
    })
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
    /* 
      用户下拉, 去服务器中获取到数据
      数据请求回来后, 关闭动画效果

      刷新 = 退出 + 进来 加载最初的 12 条数据
    */
    wx.request({
      url: app.gBaseUrl + this.data._type,
      /* ?start=0&count=3 GET + data */
      data: {
        start: 0,
        count: 12
      },
      success: (res) => {
        // console.log(res)
        this.setData({
          movies: res.data.subjects
        })
        /* get 到数据, 停止加载动画 */
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(123)
    /* 显示正在加载条 */
    wx.showNavigationBarLoading()
    // 再次请求数据
    wx.request({
      url: app.gBaseUrl + this.data._type,
      /* ?start=0&count=3 GET + data */
      data: {
        /* 直接使用 数组长度, 保证规律 */
        start: this.data.movies.length,
        count: 12
      },
      success: (res) => {
        // console.log(res)
        this.setData({
          /* 新的 12 条数据将原来的 12 条数据覆盖了, 不行 */
          movies: [...this.data.movies, ...res.data.subjects]
        })
        /* 加载成功, 正在加载条隐藏 */
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})