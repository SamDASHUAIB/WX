import { HTTP } from '../utils/http-p'
class LikeModel extends HTTP {
  /**
   *
   * @param {点赞 OR 取消点赞} behavior
   * @param {点赞对象, 具体哪一个} artID
   * @param {点赞对象的类型 期刊/电影/音乐} category
   */
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
  getClassicLikeStatus(artID, category, sCallback){
    const url = `/classic/${category}/${artID}/favor`
    this.request({
      url,
      success: sCallback
    })
  }
}

export { LikeModel }
