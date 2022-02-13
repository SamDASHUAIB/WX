import { classicBeh } from '../classic-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  /* 后面的 behavior 将会覆盖前面的 behavior (同名变量), 生命周期函数不会覆盖, 而是逐一执行 */
  /* 生命周期函数: 依次调用每个 behavior 然后再调用 组价中的 生命周期函数 */
  behaviors: [classicBeh], /* 多继承, 同名变量覆盖问题 组件中的 properties 会覆盖 behaviors 中的 properties (同名的话) */
  properties: {
    /* 需要从服务器中取到的数据, 需要使用自定义 properties 来从使用组件的页面中接收 */
    // /* 大图片的地址 */
    // img: String,
    // /* 评论 */
    // content: String,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
})
