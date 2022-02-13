/* 如同定义 Component 一样定义 Behavior */
let paginationBev = Behavior({
  data: {
    // 分页数据(所有数据)
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false /* 锁, 正常情况下, 没有发生请求 */,
  },
  methods: {
    // 新 旧 => 合并 大
    setMoreData(newArray) {
      this.setData({
        dataArray: [...this.data.dataArray, ...newArray],
      })
    },
    // 返回起始记录数(新分页起始点)
    getCurrentStart() {
      return this.data.dataArray.length
    },
    /*
      是否还有更多的数据需要加载
      两种方法进行判断
      第一: 服务器返回一个 total 总数据条数(协商接口)
      第二: 变通, 一旦发现 newArray 为空, 可以认为, 服务器已经没有数据返回了(全部返回完毕), 不可靠太绝对了
    */
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    setTotal(total) {
      this.data.total = total
      if (total === 0) {
        this.setData({
          noneResult: true,
        })
      }
    },
    initialize() {
      // dataArray 需要在页面绑定, 一定使用 setData 更新
      this.setData({ dataArray: [], noneResult: false, loading: false })
      // total 无需在页面使用, 可以使用 this.data.total 无需页面响应式更新
      this.data.total = null
    },
    isLocked() {
      // 判断 锁状态
      return this.data.loading ? true : false
    },
    locked() {
      // 加锁
      this.setData({
        loading: true,
      })
    },
    unLocked() {
      // 解锁
      this.setData({
        loading: false,
      })
    },
  },
})
export { paginationBev }
