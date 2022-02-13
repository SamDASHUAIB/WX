// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */

  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png' /* 需要暂停, 也就是现在状态是播放 */,
    playSrc: 'images/player@play.png' /* 需要播放, 也就是现在状态是暂停 */,
    playing: false /* 当前音乐没有播放 */,
  },
  /**
   * 在组件实例被从页面节点树移除时执行
   * hidden 不会触发 detached 所以要使用 wx:if
   * 因为 hidden 只是将 DOM 隐藏起来了, 而没有整个将 DOM 移除, 所以, 压根不会触发 detached 生命周期函数
   * wx:if 条件改变的时候, 会执行一次完整的生命周期(组件初始化), 消耗很大, 也将一些状态初始化了
   */
  detached(event) {
    // mMgr.stop()
  },
  attached(event) {
    // 在组件实例进入页面节点树时执行
    /*
      每次切换到 music 组件的时候, 我们做一次检测, 检测当前正在播放的音乐是否就是当前 music 的音乐
      currentMusic === classicMusic playing => true 图标显示 pause
      currentMusic !== classicMusic playing => false 图标显示 play
     */
    /* 将具体的业务逻辑封装成函数, 不要在生命周期函数中写具体的业务逻辑 */
    this._recoverStatus()

    /* 背景音频总控开关联动图片切换 */
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /* 
      用户的点击:
        播放中 -> 暂停播放
        暂停播放 -> 播放中
    */
    onPlay() {
      /* 没有播放的话, 开始播放 */
      if (!this.data.playing) {
        /* 切换图片 */
        this.setData({
          playing: true,
        })
        /* 音乐播放 */
        /* 需要设置 src 以及 title 才会触发自动播放 */
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        // 已经在播放，点击，停止播放。
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    _recoverStatus() {
      /* mMgr.paused 是否是暂停状态 只读 */
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return /* 两个 if 只能执行一个 */
      }
      // 正在播放的音乐是否就是 当前 music 组件的音乐
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true,
        })
      }
    },
    /* 音乐总控开关联动 播放/暂停 图片切换 */
    /* 我们点击总控开关后, 会产生一些事件, 监听这些事件, 我们就可以知道总控开关的状态, 然后根据这个状态去修改页面显示(切换图片) */
    _monitorSwitch() {
      mMgr.onPlay(() => {
        /* 其实就是根据总控开关的状态然后恢复 playing 的状态 */
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      /* 直接关掉音乐播放器 */
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      /* 音乐自然播放完了 */
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    },
  },
})
