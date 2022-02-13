import { classicBeh } from '../classic-beh'

// components/classic/easy/index.js

Component({
  /**
   * 组件的属性列表
   *
   */
  behaviors: [classicBeh],
  properties: {},
  attached() {
    // 在组件实例进入页面节点树时执行
  },
  // behavior 行为, 多组件复用
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
})
