import { HTTP } from '../utils/http-p.js'
class BookModel extends HTTP {
  /* 保证这是一个 Promise 外面调用就可以使用 async/await */ 
  getHotList() {
    // 这里可以 return 对比, 纯粹回调, 无法 return 只能通过 callback 执行逻辑
    return this.request({
      url: '/book/hot_list',
    })
  }
  /* 书籍搜索 */
  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        q,
        start,
      },
    })
  }
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`,
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`,
    })
  }
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`,
    })
  }
  postComments(bid, comment) {
    return this.request({
      url: `/book/add/short_comment`,
      method: 'POST',
      data: {
        book_id: bid,
        content: comment,
      },
    })
  }
  getMyBookCount(){
    return this.request({
      url: `/book/favor/count`
    })
  }
}
export { BookModel }
