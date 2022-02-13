import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
  /* type 是 js 中的关键字, 所以我们使用 category 来代替 */
  like(behavior, artID, category) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category,
      },
    })
  }
  getClassicLikeStatus(artID, category, callback) {
    let url = `/classic/${category}/${artID}/favor`
    this.request({
      url,
      success: callback,
    })
  }
}
export { LikeModel }
