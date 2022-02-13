// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer(newVal, oldVal, changePath) {
        // console.log(newVal); // 8 新
        // console.log(oldVal); // 0 旧
        // console.log(changePath);
        /* 0 => 08 Number => String */
        let val = newVal < 10 ? '0' + newVal : newVal
        /* 永远不要在 observer 里面修改属性自身的值, 栈溢出! */
        // 在 observer 里面更新属性自身值 setData 将进入死循环, 栈溢出!
        this.setData({
          _index: val,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   * data 和 properties 不要设置同名变量, properties 会覆盖掉 data 中的 同名变量
   */
  data: {
    year: 0,
    month: '',
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    _index: '',
  },
  /*
    组件的生命周期函数
    created 生命周期函数中不能调用 setData
  */
  attached() {
    // 在组件实例进入页面节点树时执行
    // console.log(this.data.year)
    // console.log(this.data.month)
    // console.log(this.properties.index)
    let date = new Date()
    let year = date.getFullYear()
    let month = this.data.months[
      date.getMonth()
    ] 
    /* 月份从 0 开始数, 刚刚好数组下标也是从 0开始数 */

    this.setData({
      year,
      month,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {},
})
