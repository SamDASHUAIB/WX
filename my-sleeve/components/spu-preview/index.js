Component({
  properties: {
    data: Object
  },
  observers: {
    data: function (data) {
      if (!data) {
        return
      }
      if (!data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  data: {
    tags: [],
    width: 0,
    height: 0,
  },
  methods: {
    onItemTap(event) {
      const pid = event.currentTarget.dataset.pid
      //跳转, 传递 pid
      //自定义事件 triggerEvent OR 写死在组件中
      //通用型组件 OR 业务型组件(可以强耦合, 方便)
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    },
    onImgLoad(event) {
      const {width, height} = event.detail
      this.setData({
        width: 340,
        height: (340 * height / width)
      })
    }
  }
});
// 页面 组件 方法, 变量命名 思维, 具体意义, 辅助思考
// 找到问题的关键点