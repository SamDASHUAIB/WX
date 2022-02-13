// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /* properties 中的项也可以在 wxml 中使用数据绑定 */
    // text: {
    //   value: '123',
    //   type: String
    // }
    res: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   * 组件的开发者不应该决定
   * 点击之后做什么事情  不应该 提供接口
   * 组件的使用者才来决定
   * 
   * 自定义事件
   */
  methods: {
    /* 自定义事件 */
    onTap(event) {
      console.log(event)
      /* 以 data- 开头的自定义属性通过 event.currentTarget.dataset 获取 */
      // const pid = event.currentTarget.dataset.postId

      const pid = this.properties.res.postId
      // console.log(postId)
      /* 自定义事件 + 传递数据, 使用对象传递数据 */
      this.triggerEvent('posttap', {
        pid,
      })
    }
  }
})
