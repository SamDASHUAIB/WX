import {postList} from "../../data/data";
//全局变量, 多页面共享
const app = getApp()
// console.log(app.test)
Page({
  data: {
    post: {},
    collected: false,
    _pid: null,
    _postsCollected: null,
    isPlaying: false,
    _mgr: null
  },
  onLoad: function (options) {
    // 拿到路由参数 params (?query) 直接 options.xxx
    let post = postList[options.id]
    this.data._pid = options.id
    // 读取缓存中的状态, 收藏 OR 未收藏
    const postsCollected = wx.getStorageSync('posts_collected')
    this.data._postsCollected = postsCollected
    let collected = postsCollected[this.data._pid]
    // undefined 表示文章从来没有被看过, 当然也就没有被收藏
    if (collected === undefined) {
      collected = false
    }
    this.setData({
      post,
      collected,
      isPlaying: this.currentMusicIsPlaying()
    })
    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicPause)
  },
  // 假设 未收藏 => 收藏, 哪一篇文章
  // 动态属性, this.data._pid 需要用 [] 括起来
  onCollect() {
    // const postsCollected = {} 每次 tap 都会新增一个空对象, 不对, 我们要的是累加, 所以这个对象要从缓存中读
    let postsCollected = this.data._postsCollected
    // 压根没有缓存的情况下(没有对象), 非空检验
    if (!postsCollected) {
      postsCollected = {}
    }
    postsCollected[this.data._pid] = !this.data.collected
    // 已经将本次 tap 造成的状态(收藏 OR 未收藏)更新完毕
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected)
    // 轻提示
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      duration: 2000,
    })
    //  模态框, 只有用户处理了模态框, 才能进行下一步的相关操作
    // wx.showModal({
    //   title: '是否收藏'
    // })
  },
  async onShare() {
    const res = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信', '分享到微博', '分享到小红书',]
    })
    console.log(res)
  },
  onMusicStart() {
    const mgr = this.data._mgr
    const music = this.data.post.music
    // 音乐开始播放
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    // 将播放状态保存到全局
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    this.setData({
      isPlaying: true
    })
  },
  onMusicPause() {
    const mgr = this.data._mgr
    console.log(123)
    mgr.pause()
    // 将播放状态保存到全局
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying: false
    })
  },
  currentMusicIsPlaying() {
    if (app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid) {
      return true
    }
    return false
  }
});