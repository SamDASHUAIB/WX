// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean /* 第一期, 最早, 右箭头禁用状态(变灰) */,
    latest: Boolean /* 最后一期, 最新, 左箭头禁用状态(变灰) */,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: './images/triangle.dis@left.png',
    leftSrc: './images/triangle@left.png',
    disRightSrc: './images/triangle.dis@right.png',
    rightSrc: './images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event) {
      /* 变灰, 压根不会 trigger 事件 */
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {}) // 事件名 detail对象 事件选项
      }
    },
    onRight(event) {
      /* 变灰, 压根不会 trigger 事件,*/
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {}) // 事件名 detail对象 事件选项
      }
    },
  },
})
