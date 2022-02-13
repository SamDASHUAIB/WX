// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   * 小程序: 合并 properties 以及 data 为一个 js 对象
   * properties 和 data 中不要出现同名属性, 如果出现 properties 会覆盖 data 的同名属性
   */
  properties: {
    /* 期刊编号 */
    /* properties 中的数据项要使用 type 来定义, 小程序会自动给一个 初始值(Number 就是 0) */
    index: {
      // type: String, /* '' => '8' => '08' => '008' =>... 无限递归, 因为一直在向前加 0 一直在变, 也一直在触发 observer 监听函数 */
      type: Number /* 0 => 8 => '08' => 8(自动转换) observer 函数没有监听到改变, 不会继续执行 */,
      /*
        处理 index 补 0 8 => 08
        属性值一旦发生改变, observer 函数开始执行
        那么当默认值 0 变成了服务器取得的数据 8 的时候
        我们可以得知, 一定能够拿到 8 然后对 8 进行处理
      */
      observer(newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        /* 不要在 observer 函数中 setData 更新 属性本身, 会无限递归, 栈溢出 */
        // console.log(val);
        this.setData({
          _index: val,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* data 中的数据项, 要使用 初始值定义(0 '' null) */
    year: 0,
    month: '',
    _index: '',
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
  },
  /**
   * 组件的方法列表
   */
  attached() {
    // 在组件实例进入页面节点树时执行
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year,
      month: this.data.months[month],
    })
  },
  methods: {},
})
