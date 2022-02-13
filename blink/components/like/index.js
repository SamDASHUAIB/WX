// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    /* 需要开放的数据, 其实也就是 properties, 需要页面从外部将数据传过来 */
    /* page 使用自定义 properties 将数据传递到组件, 由组件进行渲染数据操作 */
    like: Boolean /* Boolean 的默认值是 false */,
    count: Number /* 数字的默认值是 0 */,
    readOnly: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* data bind 数据绑定 */
    /* 内部封闭的数据 */
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if (this.properties.readOnly) {
        return /* 只读, 不允许后续操作 */
      }
      let like = this.properties.like
      let count = this.properties.count

      /* 
        tap 了之后, like: true(此时的状态) => false -1  false(此时的状态) => true +1
      */
      count = like ? count - 1 : count + 1
      // 通知 WXML 去更新页面
      this.setData({
        like: !like, // 已经取反了，后续用到 like 无需取反
        count,
      })
      /*
      自定义事件需要实现的目标:
      第一: 通知页面（父组件）用户 tap 了本组件
      第二: 用户 "点赞" OR "取消点赞" (子组件知道, like 值)告诉页面
    */
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', { behavior }, {}) // 事件名 detail对象(将状态传递给页面) 事件选项
    },
  },
})
