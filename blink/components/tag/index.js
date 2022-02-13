// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  options: {
    /* 开启插槽 */
    multipleSlots: true,
  },
  properties: {
    text: String,
  },
  externalClasses: ['tag-class'] /* 外部样式类定义的地方 */,

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      /* 触发一个自定义事件, 将标签的文本 text 传递到页面 */
        this.triggerEvent('tapping', {text: this.properties.text}, {}) // 事件名 detail对象 事件选项
    },
  },
})
