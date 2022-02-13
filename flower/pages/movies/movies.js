// pages/movies/movies.js
/* 获取到全局 app.js 中的变量 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /* 网络请求在页面中发出，而不是在自定义组件中发出 */
    /* wx.request 不支持 await async */
    //  var that = this
    wx.request({
      url: app.gBaseUrl + 'in_theaters?start=0&count=3',
      success: (res) => {
        // console.log(res)
        this.setData({
          inTheaters: res.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'coming_soon',
      /* ?start=0&count=3 可以被 data 所替代, 需要使用 GET 方法 */
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        /* GET 是默认值 */
        // console.log(res)
        this.setData({
          comingSoon: res.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'top250?start=0&count=3',
      success: (res) => {
        // console.log(res)
        this.setData({
          top250: res.data.subjects
        })
      }
    })

  },
  onGoToMore(event) {
    // console.log(event)
    const type = event.currentTarget.dataset.type
    // console.log(event)
    // console.log(type)

    /* 携带 type 参数, 将数据传递到 more-movie 页面中 */
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },
  onConfirm(event) {
    // console.log(event)
    // const value = event.detail.value
    // console.log(value)
    /* 即使没有出现搜索结果, 我们也应该切换到搜索页面 */
    this.setData({
      searchResult: true
    })
    wx.request({
      url: app.gBaseUrl + 'search',
      data: {
        q: event.detail.value
      },
      success: (res) => {
        this.setData({
          searchData: res.data.subjects
        })
      }
    })
  },
  onSearchCancel(event) {
    this.setData({
      searchResult: false
    })
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