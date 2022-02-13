// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    like: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const bid = this.properties.book.id
      /* 路径参数 params 传递简单地数据项 */
      /*
        跳转行为和组件绑定在一起
        项目组件, 通用性低, 但是简便
      */
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
    },
  },
})
