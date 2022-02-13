/* 分页 */
const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null /* 搜索项在服务器的数据总条数 */,
    noneResult: false, /* 没有搜索结果, 显示友好提示 */
    loading: false,  /* 锁变量, 表示用户正在发送请求 */
  },

  methods: {
    /* 新添加的数据(用户下拉), 合并到旧的 dataArray 中 */
    // setMoreData(dataArray) {
    //   const tempArray = this.data.dataArray.concat(dataArray)
    //   this.setData({
    //     dataArray: tempArray,
    //   })
    // },
    setMoreData(dataArray) {
      const tempArray = [...this.data.dataArray, ...dataArray]
      this.setData({
        dataArray: tempArray,
      })
    },
    /* (每一次请求新数据的)起始的记录数 */
    getCurrentStart() {
      /* 数组的长度就是我们开始新一次请求的位置 */
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if (total === 0) {
        this.setData({
          noneResult: true, /* 服务器没有返回数据 */
        })
      }
      // nihao 没有数据, 用户在 nihao 的基础上删掉 hao 变成了，ni 搜索有数据，此时需要将 noneResult 设为 false 
      else {
        this.setData({
          noneResult: false,
        })
      }
    },
    /* 是否(服务器)中还有更多的数据要加载 */
    hasMore() {
      /* total 就是服务器总共的数据(条数) */
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize() {
      /* 清空数据, 保证每一次重新搜索, 都是新结果, 不会在原来的基础上累加(dataArray)从而造成重复显示 */
      /* 一定要记住, 任何更新操作(dataBind 在页面的数据项)都要使用 setData */
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false,
      })
      /* 没有应用在 wxml 中的数据项, 可以不适用 setData */
      this.data.total = null
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      /* 锁住 */
      this.setData({
        loading: true,
      }) 
    },

    unLocked() {
      this.setData({
        loading: false,
      })
    },
  },
})

export { paginationBev }
