// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean /* 是否是第一期 */,
    latest: Boolean /* 是否是最新一期 */,
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* 记得 路径要用 / 而 windows 默认的是 \ 要批量替换 */
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event) {
      /* 健壮, 左箭头变灰, 压根不触发事件 */
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {}) // 事件名 detail对象 事件选项
      }
    },
    onRight(event) {
      /* 健壮, 右箭头变灰, 压根不触发事件 */
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {}) // 事件名 detail对象 事件选项
      }
    },
  },
})
