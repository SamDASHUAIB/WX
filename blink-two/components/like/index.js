// components/live/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*
      {
        type: Boolean,
        value: false,
        observer() {},
      }
    */
    like: Boolean,
    count: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* 组件内部使用的数据, 数据绑定 */
    /*
    组件的封装性, 开放性,
    组件的粒度, 非常简单的功能, 非常复杂的功能

    内部数据(无需开放)
    开放数据(外部传递, 从组件的外部可以设置这些开放数据)
    */
    /*
      组件通用性
      管好自己的事情
      like 组件: 点赞 +1 -1 管理点赞/取消点赞 状态(或者说记录)
      至于数据的交互, 不要管, 不要包含特定的业务逻辑
      特定的逻辑写在组件的使用方(具体页面中)
   */
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like,
      })
      /*
      自定义事件
      实现目标
      第一: 通知页面, 用户 tap 了(将用户完成 tap 的状态告诉页面)
      第二: 将状态传递出去(点赞 OR 取消点赞), 页面也就知道怎么向服务器 post 请求
    */
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', { behavior }, {}) // 事件名 detail对象 事件选项
    },
  },
})
