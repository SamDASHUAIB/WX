import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 旧版: 使用 API getUserInfo 直接弹窗, 依然可以使用 getUserInfo 来获取到用户信息, 此函数并没有被遗弃 */
    /* 使用 button 弹窗, 询问用户是否授权, 让用户点击 button, 然后授权 */
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    // console.log(userInfo);
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true,
      })
    }
  },
  async userAuthorized() {
    // wx.getSetting({
    //   success: (data) => {
    //     if (data.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: (data) => {
    //           this.setData({
    //             authorized: true,
    //             userInfo: data.userInfo,
    //           })
    //         },
    //       })
    //     }
    //   },
    // })
    const data = await wx.getSetting()
    if (data.authSetting['scope.userInfo']) {
      const info = await wx.getUserInfo()
      this.setData({
        authorized: true,
        userInfo: info.userInfo,
      })
    }
  },
  onJumpToAbout(event) {
    /* 点击跳转到 About 页面 */
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`,
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then((res) => {
      this.setData({
        bookCount: res.count,
      })
    })
  },
  getMyFavor() {
    classicModel.getMyFavor((res) => {
      this.setData({
        classics: res,
      })
    })
  },
})
