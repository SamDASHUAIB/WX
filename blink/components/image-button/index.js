// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true, /* 开启插槽 */
  },
  properties: {
    /* 驼峰, js */
    openType: {
      type: String,
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
    onGetUserInfo(event) {
      /* 将用户信息抛到页面中 */
      this.triggerEvent('getuserinfo', event.detail, {})
    },
  },
})
