// pages/posts-detail/post-detail.js
import { postList } from '../../data/data.js'
const app = getApp()
console.log(app.test)
console.log(app.global)
// 缓存，永久存在，类似于 localStorage 前端数据库，持久化
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    collected: false,
    isPlaying: false,
    _pid: null,
    _postsCollected: {},
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 一个对象，里面包含了路径传递过来的数据 pid */
    /* 只有知道了 pid 我们才能根据 pid 去 data.js 中找到对应的那一项, 进行渲染 */
    console.log(options)
    console.log(options.pid)

    this.data._pid = options.pid

    const postData = postList[options.pid]
    console.log(postData)

    /* 读取缓存 */
    const postsColloected = wx.getStorageSync('posts_colloected')
    /* 将读取到的缓存放到 data 中 */
    this.data._postsCollected = postsColloected
    let collected = postsColloected[this.data._pid]
    if (collected === undefined) {
      /* 从来没有看过此文章，当然也就没有收藏过此文章 */
      collected = false;
    }
    console.log(collected)
    console.log(postsColloected)
    this.setData({
      postData,
      collected,
      isPlaying: this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    /* 控制面板(后台)和图片切换同步, 监听控制面板的回调函数 onPlay onPause */
    mgr.onPlay(
      this.onMusicStart
    )
    mgr.onPause(
      this.onMusicPause
    )

  },
  async onCollect(event) {
    /* 假设当前图标未收藏 => 收藏 */
    // this.data.collected = true
    /* 考虑哪一篇文章被收藏, 多篇文章是否被收藏的数据结构 */
    // {
    //   id:true | false,
    // }
    let postsCollected = this.data._postsCollected
    /* 修改缓存 */
    postsCollected[this.data._pid] = !this.data.collected
    /* 修改 data */
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('posts_colloected', postsCollected)
    /* 提示框 轻提示 自动消失 */
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      duration: 2000
    })
    /* 模态框, 强提示, 必须手动取消 */
    /* 返回一个 Promise */
    // const result = await wx.showModal({
    //   title: '是否收藏文章',
    // })
    // console.log(result)
    // if (result.confirm === true) {
    //   let postsCollected = this.data._postsCollected
    //   /* 修改缓存 */
    //   postsCollected[this.data._pid] = !this.data.collected
    //   /* 修改 data */
    //   this.setData({
    //     collected: !this.data.collected
    //   })
    //   wx.setStorageSync('posts_colloected', postsCollected)
    // }
  },
  async onShare(event) {
    const res = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到朋友圈', '分享到微信'],
    })
    console.log(res)
  },
  currentMusicIsPlaying() {
    if (app.gIsPlayingMusic) {
      if (app.gIsPlayingPostId === this.data._pid) {
        return true
      }
    }
    return false
  },
  onMusicStart(event) {
    const mgr = this.data._mgr
    const music = postList[this.data._pid].music;
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    // mgr.onPlay(
    //   () => {
    //     console.log(123)
    //   }
    // )
    /* 切换 */
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    this.setData({
      isPlaying: true
    })

  },
  onMusicPause(event) {
    console.log(1111)
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying: false
    })
    /* 
      音乐停止: start 图片
      音乐播放: stop 图片
    */
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