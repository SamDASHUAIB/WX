const app = getApp()
Page({
  onSearchCancel(event) {
    this.setData({
      searchResult: false
    })
  },
  onConfirm(event) {
    this.setData({
      searchResult: true
    })
    wx.request({
      url: app.gBaseUrl + 'search',
      data: {
        q: event.detail.value
      },
      success: result => {
        console.log(result)
        this.setData({
          searchData: result.data.subjects
        })
      }
    })
  },
  onGoToMore(event) {
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type
    })
  },
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: [],
  },
  onLoad: function (options) {
    wx.request({
      url: app.gBaseUrl + 'in_theaters?start=0&count=3',
      success: result => {
        console.log(result)
        this.setData({
          inTheaters: result.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'coming_soon',
      // data 就是查询参数 ?start=0&count=3 起作用的条件是 GET
      method: 'GET',
      data: {
        start: 0,
        count: 3
      },
      success: result => {
        console.log(result)
        this.setData({
          comingSoon: result.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'top250?start=0&count=3',
      success: result => {
        console.log(result)
        this.setData({
          top250: result.data.subjects
        })
      }
    })
  }
});