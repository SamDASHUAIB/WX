import { BookModel } from '../../models/book'
import { random } from "../../utils/common";
const bookModel = new BookModel()
// pages/book/book.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    bookModel.getHotList().then((res) => {
      // 页面需要更新, 使用 setData 不要使用 this.data(数据也会更新, 但是页面不会自动响应)
      this.setData({ books: res })
    })
  },
  onReachBottom(options) {
    // 用户下拉触底, 向组件 v-search 发送通知
    // 传入一个随机字符串, 这样组件自定义属性的 observer 函数就会一直触发
    this.setData({
      more: random(16),
    })
  },

  onSearching(event) {
    this.setData({ searching: true })
  },
  onCancel(event) {
    this.setData({ searching: false })
  },
})

//  纯粹 callback 每一层封装都需要带上 callback, 回调地狱 剥夺了 return 能力
// Promise 线性, 无需层层传递 callback 没有剥夺 return 的能力, 代码风格更好, 多个异步等待合并
// Promise 对象保存了异步调用的结果(任何时候都不会改变, 凝固), 啥时候需要, 啥时候取
// const hotList = bookModel.getHotList()
// hotList
//   .then((res) => {
//     /* 依旧是回调地狱, Promise 的错误用法, 层层嵌套 */
//     console.log(res)
//     bookModel.getMyBookCount().then((res) => {
//       console.log(res)
//       bookModel.getMyBookCount().then((res) => {
//         console.log(res)
//       })
//     })
//   })
/* 正确的 Promise 用法, 链式调用 */
// bookModel
//   .getHotList()
//   .then((res) => {
//     console.log(res)
//     return bookModel.getMyBookCount()
//   })
//   .then((res) => {
//     console.log(res)
//     return bookModel.getMyBookCount()
//   })
//   .then((res) => {
//     console.log(res)
//   })
