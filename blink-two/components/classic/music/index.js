import { classicBeh } from '../classic-beh'
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
    playing: false,
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png',
  },
  /*
    hidden 不会触发生命周期函数, DOM 实际并没有被卸载/生成
    wx:if 卸载/生成 DOM 组件将会重新执行一遍完整的生命周期函数(初始化)
  */
  // detached() {
  //   console.log(123)
  //   // mMgr.stop()
  // },
  attached() {
    /* 不要在初始化的生命周期函数中写具体的业务逻辑 */
    /* 用户体验: 当前页面, 切换组件显示 > 跳转页面 */
    /* 切换新页面
      播放/暂停 图片 恢复状态
      总控开关与图片同步
    */
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      /* 播放音乐 */
      if (!this.data.playing) {
        /* 切换图片 */
        this.setData({
          playing: true,
        })
        /* 需要同时设置 src 以及 title 才能进行播放 */
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
      /* 暂停音乐 */
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    _recoverStatus() {
      // paused 当前是否暂停或停止。（只读）对应 onPause onEnded onStop 三种状态
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return
      }
      /* 正在播放的音乐, 需要重新设置一个 playing: true 状态, 此所谓恢复状态 */
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true,
        })
      }
    },
    _monitorSwitch() {
      /* 背景音乐微信总控开关与音乐播放(图片切换)状态同步 */
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })

      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    },
  },
})
