App({
  /* 生命周期函数 */
  onLaunch(){
    console.log('小程序启动')
  },
  /* 每次重启小程序，都会重新初始化，所以不能用作计数器 */
  /* 记录 播放的状态 */
  gIsPlayingMusic: false,
  /* 记录 播放的是哪一篇文章 */
  gIsPlayingPostId: -1,
  gBaseUrl: "http://t.talelin.com/v2/movie/"
})