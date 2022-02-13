// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    showLike: Boolean,
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
      /*
        项目型组件
        牺牲了组件的通用性, 直接在组件内部跳转很简单
      */
      wx.navigateTo({
        /* url 传参 options 接参 */
        url: `/pages/book-detail/book-detail?bid=${bid}`,
        events: {},
        success: function (res) {},
      })
    },
  },
})
