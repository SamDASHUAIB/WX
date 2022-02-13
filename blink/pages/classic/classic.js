/* 使用相对路径进行 import export */
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
// 使用类中定义的方法(非 static)需要先实例化
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Component({
  /**
   * 页面的初始数据
   */
  properties: {
    cid: Number,
    type: Number,
  },
  data: {
    classic: {} /* 页面初始化的时候, 保存的是最新一期的 classic 随着用户的不断点击 classic 在不断向前回溯 */,
    length: 0,
    latest: true /* latest 和 first 应该随着 classic 的改变而变化 */,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached(options) {
    /* 数据分离 在 models 中进行数据请求 */
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classicModel.getLatest((res) => {
        /* 服务器数据(res.data) => js 中数据(res) => wxml 中数据(data bind 使用 setData) */
        // setState 数据更新。
        this.setData({
          classic: res,
          length: res.length - 1,
          likeCount: res.fav_nums,
          likeStatus:
            res.like_status /* like 点赞相关的数据需要实时性, 不能从缓存中取 */,
        })
      })
    } else {
      classicModel.getById(cid, type, (res) => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index),
        })
      })
    }
  },
  methods: {
    onLike(event) {
      // console.log(event.details.behavior)
      /* 拿到状态 */
      let behavior = event.detail.behavior
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },
    onNext(event) {
      this._updateClassic('next')
    },
    onPrevious(event) {
      this._updateClassic('previous')
    },
    _updateClassic(nextOrPrevious) {
      let index = this.data.classic.index
      classicModel.getClassic(index, nextOrPrevious, (res) => {
        /* 替换掉页面原来的 classic */
        /* 同时更新 latest 和 first 的状态 */
        /* 需要实时更新 favor 的状态 */
        // favor 不能从缓存中读取，要实时加载，即覆盖掉缓存
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index),
        })
      })
    },
    _getLikeStatus(artID, category) {
      // 发送请求，覆盖缓存。
      likeModel.getClassicLikeStatus(artID, category, (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
        })
      })
    },
  },
})
